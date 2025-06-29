// server component
import { getIndustryInsights } from "@/actions/dashboard";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import DashboardView from "./_components/DashboardView";
import { SalaryRange } from "@/lib/types";

export default async function IndustryInsightsPage() {

    const { isOnboarded } = await getUserOnboardingStatus();
    const insights = await getIndustryInsights();
    


    if (!isOnboarded) {
        redirect('/onboarding');;
    }

    //We have to serialize nextUodate cuz it contains Date() fucntion , and while passign from server comp to client , they are not serialized on their own:
    
    const serializedInsights = {...insights , nextUpdate : insights.nextUpdate.toISOString() , 
        salaryRanges : insights.salaryRanges as SalaryRange[],
      }

    return (
        <div className="container mx-auto" >

            <DashboardView insights={serializedInsights} />




        </div>
    )
}