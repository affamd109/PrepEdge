import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";

export default async function IndustryInsightsPage() {
    const {isOnboarded} = await getUserOnboardingStatus();
    
        if(!isOnboarded){
            redirect('/onboarding');;
        }
        
    return (
        <>


        
        </>
    )
}