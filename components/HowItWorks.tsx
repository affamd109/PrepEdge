"use client"

import { importance } from "@/data/importance";
import { SparklesCore } from "./ui/sparkles";

export default function HowItWorks(){
    return(

         <section className="w-full py-12 md:py-24 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">
              Four simple steps to accelerate your career growth
            </p>
          </div>

          {/* Sparkles & Center Gradient */}
          <div className="relative w-full h-15 ">
            {/* Gradient Lines */}
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

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {importance.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-xl">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


    )
   

}

  