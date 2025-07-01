import { Suspense } from "react";
import { BarLoader } from "react-spinners";
import { SparklesCore } from "@/components/ui/sparkles"; // adjust path as needed

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
         
     
      {/* Main Content */}
      <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="gray" />}>
        {children}
      </Suspense>
    </div>
  );
}
