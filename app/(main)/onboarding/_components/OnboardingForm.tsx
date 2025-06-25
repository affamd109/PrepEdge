"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {onboardingSchema} from "@/app/lib/schemas";
import {z} from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingForm({industries} : {industries: any}) {

    const [selectedInsdustries, setSelectedIndustries] = useState(null);
    const router = useRouter(); //This helps us navigate to different pages

    const {register , handleSubmit , formState:{errors} , setValue , watch  } = useForm({ 
        resolver: zodResolver(onboardingSchema) })


    return (
        <div>onboarding form</div>
      
    );
}