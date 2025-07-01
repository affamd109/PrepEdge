"use client"
import { generateQuiz } from "@/actions/interview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import useFetch from "@/hooks/use-fetch";
import {  useEffect, useState } from "react"
import { BarLoader } from "react-spinners";

export default function Quiz(){

    const [currentQuestion , setCurrentQuestion] = useState(0);
    const [answers , setAnswers ] = useState<(string | null)[]>([]); //Here i have given a type to answers , cuz it can be an array of strings or it can be null i.e no answer selected
    const [showExplanation , setShowExplanation] = useState(false);


    const {loading : generatingQuiz , func : generateQuizFn , data : quizData} = useFetch(generateQuiz);

    useEffect(() =>{
        if(quizData){
            setAnswers(new Array(quizData.length).fill(null)) //quizData is whtvr generateQuiz returns.. If u chck actions/interview.ts , u can see tht we return quiz.questions (which is an array in the prompt)
        }
    } , [quizData])

    if(generatingQuiz){
       return  <BarLoader className="mt-4" width={"100%"} color="gray" />
    }

   if (!quizData) {
  return (
    <Card className="mx-2">
      <CardHeader>
        <CardTitle>Ready to challenge yourself?</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          This quiz includes 10 carefully crafted questions tailored to your industry and skillset.
          Take your time and choose the most accurate answer for each one.
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={generateQuizFn} className="w-full">
          Begin Quiz
        </Button>
      </CardFooter>
    </Card>
  );
}

const question = quizData[currentQuestion];


    return (
        <div>

        </div>
    )
}