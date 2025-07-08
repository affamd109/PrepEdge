"use client"

import { saveResume } from "@/actions/resume"
import { resumeSchema } from "@/app/lib/schemas"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import useFetch from "@/hooks/use-fetch"
import { zodResolver } from "@hookform/resolvers/zod"
import { Download, Save } from "lucide-react"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"

export default function ResumeBuilder({ initialContent }: any) {

    const [activeTab, setActiveTab] = useState("edit"); //Tabs trigger mein value="edit"

    const { control, register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: zodResolver(resumeSchema),
        defaultValues: {
            contactInfo: {},
            summary: "",
            skills: "",
            experience: [],
            education: [],
            projects: [],
        }
    });

    const { data: saveResult, loading: isSaving, error: saveError, func: saveResumeFn } = useFetch(saveResume);

    const formValues = watch(); //This is because we need live preview

    useEffect(() => {
        if (initialContent) {

            setActiveTab("preview");
        }

    }, [initialContent])

    const onSubmit =async (data : any) =>{


    }



    return (
        <div className="space-y-4" >

            <div className="flex flex-col md:flex-row justify-between items-center gap-2 ">
                <h1 className="font-bold gradient-title text-5xl md:text-6xl">
                    Resume Builder
                </h1>

                <div className="space-x-2" >

                    <Button variant="destructive">
                        <Save className="h-4 w-4" />
                        Save
                    </Button>

                    <Button>
                        <Download className="h-4 w-4" />
                        Download Pdf
                    </Button>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} >
                <TabsList>
                    <TabsTrigger value="edit">Form</TabsTrigger>
                    <TabsTrigger value="preview">Markdown</TabsTrigger>
                </TabsList>
                <TabsContent value="edit">
                    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)} >

                        <div className="space-y-4" >
                            <h3 className="text-lg font-medium" >Contact Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50" >


                                <div className="space-y-2" >
                                    <label className="text-sm font-medium">Email</label>

                                    <Input
                                        {...register("contactInfo.email")}
                                        type="email"
                                        placeholder="Your email address"
                                    // error = {errors.contactInfo?.email}
                                    />

                                    {errors.contactInfo?.email && (
                                        <p className="text-red-600 text-sm" >{errors.contactInfo?.email.message}</p>
                                    )}
                                </div>


                                <div className="space-y-2" >
                                    <label className="text-sm font-medium">Mobile No.</label>

                                    <Input
                                        {...register("contactInfo.mobile")}
                                        type="tel"
                                        placeholder="Your mobile no."
                                    // error = {errors.contactInfo?.email}
                                    />

                                    {errors.contactInfo?.email && (
                                        <p className="text-red-600 text-sm" >{errors.contactInfo?.email.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2" >
                                    <label className="text-sm font-medium">LinkedIn Profile</label>

                                    <Input
                                        {...register("contactInfo.linkedIn")}
                                        type="url"
                                        placeholder="Your linkedIn url"
                                    // error = {errors.contactInfo?.email}
                                    />

                                    {errors.contactInfo?.linkedIn && (
                                        <p className="text-red-600 text-sm" >{errors.contactInfo?.linkedIn.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2" >
                                    <label className="text-sm font-medium">GitHub Profile</label>

                                    <Input
                                        {...register("contactInfo.github")}
                                        type="url"
                                        placeholder="Your github url"
                                    // error = {errors.contactInfo?.email}
                                    />

                                    {errors.contactInfo?.github && (
                                        <p className="text-red-600 text-sm" >{errors.contactInfo?.github.message}</p>
                                    )}
                                </div>

                            </div>

                        </div>


                         <div className="space-y-4">
              <h3 className="text-lg font-medium">Professional Summary</h3>
              <Controller
                name="summary"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className="h-32"
                    placeholder="Write a compelling professional summary..."
                    // error={errors.summary}
                  />
                )}
              />
              {errors.summary && (
                <p className="text-sm text-red-500">{errors.summary.message}</p>
              )}
            </div>


                    </form>
                </TabsContent>
                <TabsContent value="preview">Change your password here.</TabsContent>
            </Tabs>


        </div>
    )
}