"use client"

import { entrySchema } from "@/app/lib/schemas"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

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

                    </CardContent>
                    
                </Card>
            )}

            {!isAdding && (
                <Button className="w-full" variant="outline" onClick={() => setIsAdding(true)} >
                    <PlusCircle />
                    Add {type}
                </Button>
            )}

        </div>
    )
}