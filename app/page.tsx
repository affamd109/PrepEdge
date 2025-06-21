import FeatureSection from "@/components/FeatureSection";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SparklesCore } from "@/components/ui/sparkles";
import { faqs } from "@/data/faqs";
import { importance } from "@/data/importance";
import {testimonial} from "@/data/testimonial";
import { Accordion } from "@radix-ui/react-accordion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="grid-background" ></div>

      <HeroSection />

      <FeatureSection />

      <Stats />

      <HowItWorks />

        <section className="w-full py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonial.map((testimonial, index) => (
              <Card key={index} className="bg-background">
                <CardContent className="pt-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="relative h-12 w-12 flex-shrink-0">
                        <Image
                          width={40}
                          height={40}
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="rounded-full object-cover border-2 border-primary/20"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                        <p className="text-sm text-primary">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <blockquote>
                      <p className="text-muted-foreground italic relative">
                       
                        {testimonial.quote}
                        
                      </p>
                    </blockquote>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      

      <section className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Find answers to common questions about our platform
            </p>
          </div>

          <div className="max-w-3xl mx-auto ">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger  className="text-left cursor-pointer">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>


     <section className="w-full border-t border-white/10 bg-grid-small-white/[0.05]">
  <div className="mx-auto py-32 px-4 sm:px-6 lg:px-8">
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
        Ready to Accelerate Your Career?
      </h2>
      <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto">
        Join thousands of professionals upgrading their future with PrepEdge’s AI-powered career coaching.
      </p>
      <Link href="/dashboard" passHref>
        <Button
          size="lg"
          className="mt-8 font-semibold px-8 py-3 rounded-lg transition-all shadow-lg animate-bounce hover:scale-105"
        >
          Start Your Journey Today
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  </div>
</section>

















    </div>



  );
}
