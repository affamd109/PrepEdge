import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";


export const checkUser = async()  =>{
    const user = await currentUser();

    if (!user) {
        return null;
    }

    try {
        //going inside the user table
        //Here we are chcking if the user exists in our database
        const loggedInUser = await db.user.findUnique({
            where : {
                clerkUserId : user.id,
            }
        })

        if(loggedInUser) {
            return loggedInUser;
        }

        //But if user does not exist in our database, we will create a new user
        const name = `${user.firstName} ${user.lastName}`;

        //create newUser if not found :
         await db.user.create({
            data : {
                clerkUserId: user.id,
                name: name,
                email: user.emailAddresses[0].emailAddress,
                imageUrl: user.imageUrl,
            }
        })
        
    } catch (error) {
        console.log("Error checking user:", error);
        
    }
}




