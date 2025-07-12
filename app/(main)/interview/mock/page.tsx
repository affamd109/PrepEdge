"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Quiz from "../_components/Quiz";
import { SparklesCore } from "@/components/ui/sparkles";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserOnboardingStatus } from "@/actions/user";
import { toast } from "sonner";

export default function MockInterviewPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    (async () => {
      const { isOnboarded } = await getUserOnboardingStatus();
      if (!isOnboarded) {
        toast.warning("Please complete your profile to take the quiz.");
        router.push("/onboarding");
      } else {
        setChecked(true); // Show content only after check
      }
    })();
  }, []);

  if (!checked) return null; // Prevents UI flash before check

  return (
    <div className="container mx-auto space-y-4 py-6">
      <div className="flex items-center justify-center mb-8 mt-10">
        <h1 className="text-4xl md:text-6xl font-bold text-center">Mock Interview Quiz</h1>
      </div>

      {/* Sparkle and Gradient Section */}
      <div className="relative w-full h-16 mb-12">
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

      <Quiz />

      <div className="text-center">
        <Link href="/interview">
          <Button variant="link" className="gap-2 pl-0 text-md cursor-pointer">
            <ArrowLeft className="h-4 w-4" />
            Back to Interview Preparation
          </Button>
        </Link>
      </div>
    </div>
  );
}
