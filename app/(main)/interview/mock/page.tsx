import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Quiz from "../_components/Quiz";

export default function MockInterviewPage() {
    return (
        <div className="container mx-auto space-y-4 py-6">

            
                <div className="text-center mt-4 mb-10 ">
                    <h1 className="text-6xl font-bold ">Mock Interview</h1>
                    <p className="text-muted-foreground mt-2 mx-2 md:mx-0 ">
                        Test your knowledge with industry-specific questions
                    </p>
                </div>


            <Quiz />

            <div className="text-center">
                
             <Link  href="/interview">
                    <Button variant="link" className="gap-2 pl-0 text-md cursor-pointer">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Interview Preparation
                    </Button>
                </Link>

            </div>

        </div>
    );
}
