"use client"

import { improveWithAI } from "@/actions/resume"
import { entrySchema } from "@/app/lib/schemas"
import { Button } from "@/components/ui/button"
import { Card,  CardContent,  CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import useFetch from "@/hooks/use-fetch"
import { zodResolver } from "@hookform/resolvers/zod"
import { format, parse } from "date-fns"
import { Loader2, PlusCircle, SparklesIcon, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export default function EntryForm({ type, entries, onChange }: any) {

    const [isAdding, setIsAdding] = useState<boolean>(false);
    
    const formatDisplayDate = (dateString : string) =>{
        //This function formatDisplayDate takes a date string like "2023-08" and converts it into a prettier display format like "Aug 2023".

        if(!dateString) return "";

        const date = parse(dateString , "yyyy-MM" , new Date());
        return format(date , "MMM yyyy");

    }


    const { register, handleSubmit : handleValidation, formState: { errors }, watch, reset, setValue } = useForm({
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

    const handleAdd = handleValidation((data) =>{
        const formattedEntry = {
            ...data , 
            startDate : formatDisplayDate(data.startDate),
            endDate : data.endDate ? formatDisplayDate(data.endDate) : ""
//i will have to chckk if data.endDate is present or not cuz endDate is of the type of string|undefined
        }

        //Below adds a new formattedEntry to the existing entries array.
        onChange([...entries , formattedEntry]); //entries is a prop from ResumeBuilder

        //After this , just reset 

        reset();
        setIsAdding(false);

    })

    const handleDelete = (index : number) =>{
        const newEntries = entries.filter((item : any , i:number) => i !== index);
        onChange(newEntries);



    }

    const current = watch("current");

    return (

        <div className="space-y-4" >

            <div className="space-y-4">
        {entries.map((item : any, index : number) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title} @ {item.organization}
              </CardTitle>

              <Button
                variant="outline"
                size="icon"
                type="button"
                onClick={() => handleDelete(index)}
                className="border border-red-500 cursor-pointer "
              >
                <X className="h-4 w-4 text-red-500  " />
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">

        {item.current ? `${item.startDate} - Present` : `${item.startDate} - ${item.endDate}`}

              </p>
              <p className="mt-2 text-sm whitespace-pre-wrap">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>


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

                    <CardFooter className="flex justify-end space-x-2 " >

                        <Button type="button"  className="cursor-pointer"
                        onClick={handleAdd}
                         >
                            <PlusCircle/>
                            Add entry

                        </Button>

                        <Button type="button" variant="ghost" className="cursor-pointer"
                         onClick={() =>{
                            reset();
                            setIsAdding(false);
                         }
                            
                         } >
                            Cancel
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