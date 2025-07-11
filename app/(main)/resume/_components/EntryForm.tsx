"use client"

import { improveWithAI } from "@/actions/resume"
import { entrySchema } from "@/app/lib/schemas"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import useFetch from "@/hooks/use-fetch"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, PlusCircle, SparklesIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export default function EntryForm({ type, entries, onChange }: any) {

    const [isAdding, setIsAdding] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors }, watch, reset, setValue } = useForm({
        resolver: zodResolver(entrySchema),
        defaultValues: {
            title: "",
            organization: "",
            startDate: "",
            endDate: "",
            description: "",
            current: false,
        },
    })

    //As we havwe to fecth the data from the API for the improveAI content , use useEffect

    
    const {data : improvedContent , loading : isImproving , error:improveError , func:ImproveWithAIFn } =  useFetch(improveWithAI);



    useEffect(() =>{
        if(improvedContent && !isImproving){
            //we have to set the "description area" form's value so for that i will use setValue
            setValue("description" , improvedContent);
            toast.success("Description successfully improved!")
        }

    } , [improvedContent , improveError , isImproving])

    const handleImproveDesc = async() =>{
        const description = watch('description');
        if(!description){
            toast.error("Please enter the description");
            return;
        }

        await ImproveWithAIFn({
            current : description,
            type : type.toLowerCase()   //experience , projects , education
        })
    }

    const handleAdd = () =>{

    }

    const current = watch("current");

    return (

        <div>

            {isAdding && (
                <Card>
                    <CardHeader>
                        <CardTitle>Add {type}</CardTitle>

                    </CardHeader>
                    <CardContent className="space-y-4" >
                        <div  className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div>
                        <Input placeholder="Your title/position" 
                        {...register("title")} />

                        {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>    
                            )}

                            </div>

                            <div>
                        <Input placeholder="Organization/Company"
                         {...register("organization")} />

                        {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>    
                            )}

                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                        <Input type="month" placeholder="Your start date " 
                        {...register("startDate")} />

                        {errors.startDate && (
                <p className="text-sm text-red-500">{errors.startDate.message}</p>    
                            )}

                            </div>

                             <div>
                        <Input type="month" placeholder="Your title/position" 
                        disabled={current} //gets disabled if current is true
                        {...register("endDate")} />


                        {errors.endDate && (
                <p className="text-sm text-red-500">{errors.endDate.message}</p>    
                            )}

                            </div>

                            <div className="flex items-center space-x-2" >
                                <label htmlFor="current">This is your current job</label>

                                <input id="current" type="checkbox" 
                                {...register("current")}
                                onChange={(e) =>{
                                    setValue("current" , e.target.checked);

                                    if(e.target.checked){
                                        setValue("endDate" , "")
                                    }
                                }}
                                 />
                            </div>

                        </div>

                        <div className="space-y-4">

                            <p className="text-muted-foreground" >Write the description of your work experience :</p>

                            <Textarea
                            placeholder={`Description of your ${type.toLowerCase()} `}
                            className="h-32"
                            {...register("description")} />
                            
                            </div>

                            <div>
                                <Button 
                                className="cursor-pointer hover:text-muted-foreground "
                                type="button"
                                onClick={handleImproveDesc}
                                //After all this is an API call , i have to put loader
                                disabled={isImproving || !watch("description")}
                                variant="ghost" >

                                    {isImproving ? (
                                        <>
                                        <Loader2  className="h-4 w-4 animate-spin mr-2" />
                                        <p>Improving...</p>
                                        </>
                                    ) : (
                                        <>
                                        <SparklesIcon/>
                                        <p>Improve with AI</p>
                                        </>
                                    ) }
                                </Button>
                            </div>

                    </CardContent>

                    <CardFooter>
                        <Button type="button" variant="ghost" className="cursor-pointer"
                         onClick={() =>{
                            reset();
                            setIsAdding(false);
                         }
                            
                         } >
                            Cancel
                        </Button>

                        <Button type="button"  className="cursor-pointer"
                        onClick={handleAdd}
                         >

                            Add entry

                        </Button>


                    </CardFooter>
                    
                </Card>
            )}

            {/* If u havent clicked the plus icon :  */}
            {!isAdding && (
                <Button className="w-full" variant="outline" onClick={() => setIsAdding(true)} >
                    <PlusCircle />
                    Add {type}
                </Button>
            )}

        </div>
    )
}