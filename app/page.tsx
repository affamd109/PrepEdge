import Header from "@/components/header";
import HeroSection from "@/components/HeroSection";
import { Card, CardAction, CardContent } from "@/components/ui/card";
import { MovingBorderWrapper } from "@/components/ui/moving-border";
import { features } from "@/data/features";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="grid-background" ></div>

      <HeroSection />

      <section className="w-full py-12 md:py-24 bg-background " >
        <div className="container mx-auto px-4 md:px-6" >

          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12" >
            Powerful features for your career growth
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl md:mx-auto" >
            {features.map((feature, index) => (

              <MovingBorderWrapper key={index} borderRadius="1rem" className="bg-black">
                <Card className="bg-black h-68 md:h-76">
                  <CardContent className="pt-6 text-center flex flex-col items-center">
                    <div className="flex flex-col items-center justify-center">
                      {feature.icon}
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </MovingBorderWrapper>


            ))}

          </div>




        </div>



      </section>



    </div>



  );
}
