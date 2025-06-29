"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


export const generateAIInsights = async (industry: string) => {
    const prompt = `
          Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "salaryRanges": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "High" | "Medium" | "Low",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "Positive" | "Neutral" | "Negative",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
          }
          
          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
          Include at least 5 common roles for salary ranges.
          Growth rate should be a percentage.
          Include at least 5 skills and trends.
        `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const rawText = await response.text();
        const cleanedText = rawText.replace(/```(?:json)?\n?/g, "").trim();

        return JSON.parse(cleanedText);

    } catch (error: any) {
        throw new Error("Gemini API processing failed", error.message);


    }
}


export async function getIndustryInsights() {
    //frst chck if user is there : 

    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId
        },
        include: {
            industryInsight: true
        }
    })

    if (!user) {
        throw new Error("User not found");

    }

    if (!user.industryInsight) {

        if (!user.industry) throw new Error("Industry not set")
        const insights = await generateAIInsights(user.industry);

        // in place of line 62 and 63 i can also write :
        // const insights =  generateAIInsights(user.industry!) --> certain that industry cant be null


        const industryInsight = await db.industryInsight.create({
            data: {
                industry: user.industry,
                ...insights,
                nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) //1k for millisecs

            }


        })

        return industryInsight;

    }

    //Or else if industryInsight is already present , then :

    return user.industryInsight;

}