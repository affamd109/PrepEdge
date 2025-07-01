"use server"

import { db } from "@/lib/prisma";
import { QuizQuestions } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


export async function generateQuiz(){
    const {userId} = await auth();
    if(!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where :{
            clerkUserId : userId
        }

    })

    if(!user) throw new Error("User not found");


     try {
        const prompt = `
       Generate 10 technical interview questions for a ${
         user.industry
       } professional${
       user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
     }.
       
       Each question should be multiple choice with 4 options.
       
       Return the response in this JSON format only, no additional text:
       {
         "questions": [
           {
             "question": "string",
             "options": ["string", "string", "string", "string"],
             "correctAnswer": "string",
             "explanation": "string"
           }
         ]
       }
     `;
   
     const result = await model.generateContent(prompt);
     const response = result.response;
     const rawText = response.text();
   
      const cleanedText = rawText.replace(/```(?:json)?\n?/g, "").trim();
   
      const quiz =  JSON.parse(cleanedText);
      return quiz.questions;
      
     } catch (error) {
        console.log("Error generating quiz ");
        throw new Error("Failed to generate quiz");
        
        
     }
    
}


export async function saveQuizResults(questions :QuizQuestions[] , answers :string , score:number){
    const {userId} = await auth();
    if(!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where :{
            clerkUserId : userId
        }

    })

    if(!user) throw new Error("User not found");

    //This gives us an array of objects
   
    const questionResults = questions.map((q , index)=>({
        question : q.question,
        answer : q.correctAnswer,
        userAnswer : answers[index],
        isCorrect : q.correctAnswer === answers[index],
        explanation : q.explanation ,

    }))

    const wrongAnswers = questionResults.filter((q) => !q.isCorrect);
//     wrongAnswers = an array of wrong answer objects
//     Each object in wrongAnswers likely looks like this:

//     {
//   question: "What is closure in JavaScript?",
//   answer: "A function having access to its outer scope",
//   userAnswer: "A variable hoisted to the top"
// }



let improvementTip = null;
let wrongQuestionsText = "";

//If we are getting wrong answers , then we will generate the improvement tip :
    if(wrongAnswers.length >0){
          wrongQuestionsText = wrongAnswers.map((q) =>
          `Question: "${q.question}"\nCorrect Answer: "${q.answer}"\nUser Answer: "${q.userAnswer}"`
      )
      .join("\n\n");


    }
//Notice that before .join .. wrongQuestionsText was an array of strings .. and after .join , it becomes one large string 

   const improvementPrompt = `
      The user got the following ${user.industry} technical interview questions wrong:

      ${wrongQuestionsText}

      Based on these mistakes, provide a concise, specific improvement tip.
      Focus on the knowledge gaps revealed by these wrong answers.
      Keep the response under 2 sentences and make it encouraging.
      Don't explicitly mention the mistakes, instead focus on what to learn/practice.
    `;


    try {
        const result = await model.generateContent(improvementPrompt);
        const response = result.response;
        improvementTip = response.text().trim(); //Here no need to get the cleanedTex because we are not asking for any kind of JSON object.. 
    } catch (error) {
        console.log("Error generating improvement tip");
        throw new Error("Error generating improvement tip");
        
        
    }


    //Now save this to db in the assessment model

   try {
     const assessment = await db.assessment.create({
          data: {
         userId: user.id,
         quizScore: score,
         questions: questionResults,
         category: "Technical",
         improvementTip,
       },
     })
 
     return assessment;
 
   } catch (error) {
    console.log("Error saving quiz results" , error);
    throw new Error("Error saving quiz results");
    

    
   }











}