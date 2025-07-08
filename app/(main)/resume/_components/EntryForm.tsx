import { entrySchema } from "@/app/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export default function EntryForm({type , entries , onChange} : any){

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

        </div>
    )
}