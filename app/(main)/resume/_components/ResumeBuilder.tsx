"use client"

import { saveResume } from "@/actions/resume"
import { resumeSchema } from "@/app/lib/schemas"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import useFetch from "@/hooks/use-fetch"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertTriangle, Download, Edit, Loader2, Monitor, Save } from "lucide-react"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import EntryForm from "./EntryForm"
import { entriesToMarkdown } from "@/app/lib/helper"
import { useUser } from "@clerk/nextjs"
import MDEditor from '@uiw/react-md-editor';
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { toast } from "sonner"
import { SparklesCore } from "@/components/ui/sparkles"


type ResumeBuilderProps = {
  initialContent: string | undefined
}



export default function ResumeBuilder({ initialContent }: ResumeBuilderProps ) {

    const [activeTab, setActiveTab] = useState<string>("edit"); //Tabs trigger mein value="edit"
    const [resumeMode, setResumeMode] = useState<"edit" | "preview">("preview");
const [previewContent, setPreviewContent] = useState<string | undefined>(initialContent);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const { user, isLoaded } = useUser();




    const { control, register,  watch, formState: { errors } } = useForm({
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

    const formValues = watch(); //This is because we need live preview , You can use it to build live previews, generate markdown, or auto-save data.Means : "Get the latest snapshot of all the form fields."


    const getContactMarkdown = () => {
        const { contactInfo } = formValues;

        const parts = [];

        if (contactInfo.email) parts.push(` ${contactInfo.email}`);
        if (contactInfo.mobile) parts.push(` ${contactInfo.mobile}`);
        if (contactInfo.linkedIn)
            parts.push(`[LinkedIn](${contactInfo.linkedIn})`);
        if (contactInfo.github) parts.push(` [Twitter](${contactInfo.github})`);

        return parts.length > 0 && user
            ? `## <div align="center">${user.fullName}</div>
        \n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
            : "";
    };

    const getCombinedContent = () => {
        const { summary, skills, experience, education, projects } = formValues;

        return [
            getContactMarkdown(),
            summary && `## Professional Summary\n\n${summary}`,
            skills && `## Skills\n\n${skills}`,
            entriesToMarkdown(experience, "Work Experience"),
            entriesToMarkdown(education, "Education"),
            entriesToMarkdown(projects, "Projects"),
        ]
            .filter(Boolean)
            .join("\n\n");
    };



    useEffect(() => {
        if (initialContent) {

            setActiveTab("preview");
        }

    }, [initialContent]);


    useEffect(() => {

        if (activeTab === "edit") {
            const newContent = getCombinedContent();
            setPreviewContent(newContent ? newContent : initialContent);
        }

    }, [formValues, activeTab]);

    useEffect(() =>{
        if(saveResult && !isSaving){
            toast.success("Resume saved successfully");
        }
        if(saveError){
            toast.error(saveError.message || "Failed to save resume");
        }
    } ,[saveResult , isSaving , saveError] ) ;


    const onSubmit = async () => {
        try {
            await saveResumeFn(previewContent ?? "" );


        } catch (error: unknown) {
            console.log("Error while saving", error);
            throw new Error("Error while saving");

        }

    }



 const generatePDF = async () => {
  setIsGenerating(true);
  try {
    const element = document.getElementById("resume-pdf");
    if (!element) return;

    // ✅ Wait for the element to fully render
    await new Promise(resolve => setTimeout(resolve, 300));

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume.pdf");
  } catch (error) {
    console.error("PDF generation error:", error);
  } finally {
    setIsGenerating(false);
  }
};


    if (!isLoaded || !user) {
        return <></>;
    }


    return (
        <div className="space-y-4" >


                
                <h1 className="font-bold gradient-title text-center text-5xl md:text-6xl">
  Resume Builder
</h1>

{/* Sparkle and Gradient Section */}
<div className="relative w-full h-16 mb-12 mt-2">
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] blur-sm bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-500" />
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-500" />
  <SparklesCore
    background="transparent"
    minSize={0.4}
    maxSize={1}
    particleDensity={1200}
    className="w-full h-full"
    particleColor="#FFFFFF"
  />
  <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
</div>


                <div className="flex justify-center md:justify-end   space-x-2" >


                    <Button className="cursor-pointer" onClick={generatePDF} disabled={isGenerating}  >

                        {isGenerating ? (
                            <>

                                <Loader2 className="h-4 w-4 mr-2" />
                                Downloading Pdf
                            </>

                        ) : (
                            <>
                                <Download className="h-4 w-4" />
                                Download Pdf
                            </>
                        )}
                    </Button>

                    <Button className="cursor-pointer " variant="destructive" onClick={onSubmit} 
                    disabled={isSaving} >
                        {isSaving ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="h-4 w-4" />
                                Save
                            </>
                        )}
                    </Button>

                </div>



            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4" >
                <TabsList>
                    <TabsTrigger value="edit">Form</TabsTrigger>
                    <TabsTrigger value="preview">Markdown</TabsTrigger>
                </TabsList>
                <TabsContent value="edit">
                    <form className="space-y-8"  >

                        <div className="space-y-4" >
                            <h3 className="text-lg font-medium mt-5" >Contact Information</h3>
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
                            {/* When u are inside a react hook form , and using components like textarea from other libraries like shadCN UI , then u have to wrap it around a controller tag */}

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

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Skills</h3>

                            {/* When u are inside a react hook form , and using components like textarea from other libraries like shadCN UI , then u have to wrap it around a controller tag */}
                            <Controller
                                name="skills"
                                control={control}
                                render={({ field }) => (
                                    <Textarea
                                        {...field}
                                        className="h-32"
                                        placeholder="Mention your skills..."
                                    // error={errors.summary}
                                    />
                                )}
                            />
                            {errors.skills && (
                                <p className="text-sm text-red-500">{errors.skills.message}</p>
                            )}
                        </div>


                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Work Experience</h3>

                            {/* When u are inside a react hook form , and using components like textarea from other libraries like shadCN UI , then u have to wrap it around a controller tag */}
                            <Controller
                                name="experience"
                                control={control}
                                render={({ field }) => (

                                    <EntryForm type="Experience" entries={field.value} onChange={field.onChange} />

                                )}
                            />
                            {errors.experience && (
                                <p className="text-sm text-red-500">{errors.experience.message}</p>
                            )}
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Education</h3>


                            <Controller
                                name="education"
                                control={control}
                                render={({ field }) => (
                                    <EntryForm type="Education" entries={field.value}
                                        onChange={field.onChange} />


                                )}
                            />
                            {errors.education && (
                                <p className="text-sm text-red-500">{errors.education.message}</p>
                            )}
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Projects</h3>


                            <Controller
                                name="projects"
                                control={control}
                                render={({ field }) => (
                                    <EntryForm type="Projects" entries={field.value}
                                        onChange={field.onChange} />


                                )}
                            />
                            {errors.projects && (
                                <p className="text-sm text-red-500">{errors.projects.message}</p>
                            )}
                        </div>


                    </form>


                </TabsContent>
                <TabsContent value="preview">

                    {activeTab === "preview" && (
                        <Button
                            variant="link"
                            type="button"
                            className="mb-2 mt-5"
                            onClick={() =>
                                setResumeMode(resumeMode === "preview" ? "edit" : "preview")
                            }
                        >
                            {resumeMode === "preview" ? (
                                <>
                                    <Edit className="h-4 w-4" />
                                    Edit Resume
                                </>
                            ) : (
                                <>
                                    <Monitor className="h-4 w-4" />
                                    Show Preview
                                </>
                            )}
                        </Button>
                    )}

                    {activeTab === "preview" && resumeMode !== "preview" && (
                        <div className="flex p-3 gap-2 items-center border-2 border-yellow-600 text-yellow-600 rounded mb-2">
                            <AlertTriangle className="h-5 w-5" />
                            <span className="text-sm">
                                You will lose editied markdown if you update the form data.
                            </span>
                        </div>
                    )}

                    <div>
                        <MDEditor
                            value={previewContent}
                            onChange={setPreviewContent}
                            height={800}
                            preview={resumeMode}
                        />

                   <div
  style={{
    opacity: 0,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
    pointerEvents: "none",
  }}
>
  <div id="resume-pdf">
    <MDEditor.Markdown
      source={previewContent}
      style={{
        background: "white",
        color: "black",
        padding: "1rem",
        width: "210mm", // A4 width
      }}
    />
  </div>
</div>




                    </div>

                </TabsContent>
            </Tabs>


        </div>
    )
}