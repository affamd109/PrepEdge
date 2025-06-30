import { Suspense } from "react";
import { BarLoader } from "react-spinners";
import { SparklesCore } from "@/components/ui/sparkles"; // adjust path as needed

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-5">
      {/* Centered Heading */}
      <div className="flex items-center justify-center mb-8 mt-10">
        <h1 className="text-4xl md:text-6xl font-bold text-center">Industry Insights</h1>
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

      {/* Main Content */}
      <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="gray" />}>
        {children}
      </Suspense>
    </div>
  );
}
