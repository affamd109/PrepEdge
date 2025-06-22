import {industries} from '@/data/industries';
import OnboardingForm from './_components/OnboardingForm';

export default function OnboardingPage() {
    return (
        <main>

            <OnboardingForm  industries={industries}   />



        </main>
        
    )
}