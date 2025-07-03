"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Save } from "lucide-react"
import { useState } from "react"

export default function ResumeBuilder({initialContent} : any){

    const [activeTab , setActiveTab] = useState("edit");



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
                        <Download  className="h-4 w-4"/>
                        Download Pdf
                    </Button>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} >
  <TabsList>
    <TabsTrigger value="edit">Form</TabsTrigger>
    <TabsTrigger value="preview">Markdown</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Make changes to your account here.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>


        </div>
    )
}