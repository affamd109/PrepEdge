"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "@/app/lib/schemas";
import { z } from "zod";
import { useState } from "react";
// import { useRouter } from "next/navigation";
import { Card,  CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { updateUser } from "@/actions/user";
import { Loader2 } from "lucide-react";
import { Industry } from "@/lib/types";

export default function OnboardingForm({ industries }: { industries: Industry[] }) {

    // Define the type for industries based on the structure of the data
    

    const typedIndustries = industries as Industry[];

    type onboardingFormData = z.infer<typeof onboardingSchema>;

    const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
    // const router = useRouter(); //This helps us navigate to different pages

    //Using my custom hook : 
    const {  loading : updateLoading , func : updateUserfn } = useFetch(updateUser);

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        resolver: zodResolver(onboardingSchema)
    })

    const watchIndustry = watch("industry"); //If the indusrty is selected by the user , then u can use this to show the subindsutries

    const onSubmit = async(values : onboardingFormData  ) =>{
        console.log(values);

    try {
        
const formattedIndustry = `${values.industry}-${values.subIndustry.toLowerCase().replace(/ /g,"-")}`
    
await updateUserfn({
  industry: formattedIndustry,
  experience: values.experience,
  bio: values.bio ?? "", // fallback to empty string if undefined
  skills: values.skills ?? [], // fallback to empty array if undefined
});
    
    } catch (error) {
        console.log("Onboarding error" , error);
        
    }

    }


    // useEffect(() =>{

    //     if(updateResult?.success && !updateLoading){
    //         toast.success("Profile completed successfully")
    //         router.push("/dashboard");
    //         // router.refresh();
            
    //     }


    // } , [updateResult , updateLoading])



    return (
        <div className="flex items-center justify-center bg-background" >
            <Card className="w-full max-w-lg mt-10 mx-2">
                <CardHeader>
                    <CardTitle className="gradient-title text-4xl">
                        Complete Your Profile
                    </CardTitle>


                    <CardDescription>
                        Choose your industry to get tailored career guidance and smart recommendations.
                    </CardDescription>

                </CardHeader>
                <CardContent>

                    <form className="space-y-6"  onSubmit={handleSubmit(onSubmit)} >

                        <div className="space-y-3">

                            <Label htmlFor="industry">Industry</Label>
                            <Select
                                onValueChange={(value) => {
                                    setValue("industry", value);
                                    setSelectedIndustry(industries.find((ind: Industry) => ind.id === value) || null )
                                    setValue("subIndustry", "");
                                }

                                } >
                                <SelectTrigger id="industry" className="cursor-pointer">
                                    <SelectValue placeholder="Select an industry" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Industries</SelectLabel>
                                        {typedIndustries.map((ind) => (
                                            <SelectItem key={ind.id} value={ind.id}>
                                                {ind.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.industry && (
                                <p className="text-sm text-red-500">
                                    {errors.industry.message}
                                </p>
                            )}

                        </div>

                      { watchIndustry && ( <div className="space-y-3">

                            <Label htmlFor="subIndustry">Specialization</Label>
                            <Select
                                onValueChange={(value) => {
                                    setValue("subIndustry", value);

                                }

                                } >
                                <SelectTrigger id="subIndustry" className="cursor-pointer">
                                    <SelectValue placeholder="Select a specialization" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Specializations</SelectLabel>

                                        {selectedIndustry?.subIndustries.map((subInd) => (
                                            <SelectItem key={subInd} value={subInd}>
                                                {subInd}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.subIndustry && (
                                <p className="text-sm text-red-500">
                                    {errors.subIndustry.message}
                                </p>
                            )}

                        </div>)}

                        <div className="space-y-3">

                            <Label htmlFor="subIndustry">Years of experience</Label>
                            <Input 
                            id="experience "
                            type="number"
                            placeholder="Enter your years of experience"
                            //in order to keep track of this field, we use the register function from react-hook-form
                            {...register("experience")}
                            />
                           
                            {errors.experience && (
                                <p className="text-sm text-red-500">
                                    {errors.experience.message}
                                </p>
                            )}

                        </div>

                        <div className="space-y-3">

                            <Label htmlFor="subIndustry">Skills</Label>
                            <Input 
                            id="skills"
                            placeholder="Relevant industry skills... "
                            {...register("skills")}
                            />

                            {errors.skills && (
                                <p className="text-sm text-red-500">
                                    {errors.skills.message}
                                </p>
                            )}

                        </div>

                          <div className="space-y-2">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about your professional background..."
                className="h-32"
                {...register("bio")}
              />
              {errors.bio && (
                <p className="text-sm text-red-500">{errors.bio.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full cursor-pointer " disabled={updateLoading} >
                {
                    updateLoading ? (
                    <>
                    <Loader2 className=" mr-2 h-4 w-4 animate-spin" />
                    Saving...
                    </>
                    ) : ("Complete profile")
                }
                
               </Button>


                    </form>

                </CardContent>

            </Card>






        </div>

    );
}