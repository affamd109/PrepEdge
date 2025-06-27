import { Suspense } from "react";
import {BarLoader} from "react-spinners"


export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
         <div className="px-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient-title">Industry Insights</h1>
      </div>

      {/* Suspense : Lets you display a fallback until its children have finished loading. */}

      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="gray" />}
      >
        {children}
      </Suspense>
    </div>
       
    );
}


