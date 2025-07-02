import { getAssessments } from "@/actions/interview"
import StatsCards from "./_components/StatsCards";
import PerformanceChart from "./_components/PerformanceChart";
import QuizList from "./_components/QuizList";
import { SparklesCore } from "@/components/ui/sparkles";


export default async function InterviewPage() {

    const assessments = await getAssessments();


    return (
         <div>
       <div className="flex items-center justify-center mb-8 mt-10">
              <h1 className="text-4xl md:text-6xl font-bold text-center">Your Progress</h1>
            </div>
      
            {/* Sparkle and Gradient Section */}
            <div className="relative w-full h-16 mb-12">
              {/* Indigo Gradient Line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] blur-sm bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-500" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-500" />
      
              {/* Sparkles */}
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />
      
              {/* Radial mask */}
              <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>

      <div className="space-y-6 gap-5">
        <StatsCards assessments={assessments} />
        <PerformanceChart assessments={assessments} />
        <QuizList assessments={assessments} />
      </div>
    </div>

    
    )
}

//This page only renders /interview