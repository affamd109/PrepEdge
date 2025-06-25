import {industries} from '@/data/industries';
import OnboardingForm from './_components/OnboardingForm';
import { getUserOnboardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';

export default async function OnboardingPage() {

    const {isOnboarded} = await getUserOnboardingStatus();

    if(isOnboarded){
        redirect('/dashboard');;
    }


    return (
        <main>

            <OnboardingForm  industries={industries}   />



        </main>
        
    )
}