"use client"

import { entrySchema } from "@/app/lib/schemas"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function EntryForm({type , entries , onChange} : any){

    const [isAdding , setIsAdding] = useState<boolean>(false);

    const {register , handleSubmit , formState : {errors} , watch , reset , setValue} =  useForm({
        resolver : zodResolver(entrySchema),
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

            {!isAdding && (
                <Button className="w-full" variant="outline" onClick={() => setIsAdding(true)} >
                    <PlusCircle />
                    Add {type}
                </Button>
            )}

        </div>
    )
}