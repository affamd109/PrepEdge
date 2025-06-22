"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { use } from "react";

export  async function updateUser(data : any) {

    const {userId} = await auth();

    if(!userId) {
        throw new Error("User not authenticated");
    }

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId
        }
    })

    if(!user) {
        throw new Error("User not found");
        
    }

    //Now as user is found , we can conect to the database

    try {
        
    } catch (error) {
        
    }



}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
      },
    });

    return {
      isOnboarded: !!user?.industry,
    };
    
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}