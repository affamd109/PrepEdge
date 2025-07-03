import { Suspense } from "react";
import { BarLoader } from "react-spinners";


export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-5">
     

      {/* Main Content */}
      <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="gray" />}>
        {children}
      </Suspense>
    </div>
  );
}
