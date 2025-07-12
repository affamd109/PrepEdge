"use client"
import { generateQuiz, saveQuizResult } from "@/actions/interview";
import { Button } from "@/components/ui/button";
import { Card, CardContent,  CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useFetch from "@/hooks/use-fetch";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react"
import { BarLoader } from "react-spinners";
import { toast } from "sonner";
import QuizResult from "./QuizResult";

export default function Quiz() {

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<(string | null )[]>([]); //Here i have given a type to answers , cuz it can be an array of strings or it can be null i.e no answer selected
    const [showExplanation, setShowExplanation] = useState(false);


    const { loading: generatingQuiz, func: generateQuizFn, data: quizData } = useFetch(generateQuiz);

    //custom hook used for saving the results : 
    const { loading: savingResult, func: saveQuizResultFn, data: resultData , setData : setResultData } = useFetch(saveQuizResult);
     console.log(resultData);

    const handleAnswer = (answer : string) =>{
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = answer;
        setAnswers(newAnswers);
    };

    const handleNext = () =>{
        if(currentQuestionIndex < quizData.length-1){
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setShowExplanation(false);
        }
        else{
            finishQuiz();
        }

    }

    const calculateScore = () =>{
        let correct = 0;
        answers.forEach((answer , index) =>{
            if(answer === quizData[index].correctAnswer){
                correct++;
            }
        });

        return (correct/(quizData.length))*100; //Send percentage to frontend and backend


    }

    const finishQuiz = async() =>{
        //This calculates the final score of the quiz and triggers an API call to save our performance
        let score = calculateScore();

        try {
            await saveQuizResultFn(quizData , answers as string[] , score);
            toast.success("Quiz completed!")
        } catch (error: any) {
            console.log("Error saving the results" , error)
            throw new Error("Error saving the results" , error);
            
            
        }
    }

    useEffect(() => {
        if (quizData) {
            setAnswers(new Array(quizData.length).fill(null)) //quizData is whtvr generateQuiz returns.. If u chck actions/interview.ts , u can see tht we return quiz.questions (which is an array in the prompt)
        }
    }, [quizData]);

    const startNewQuiz = () =>{
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setShowExplanation(false);
        generateQuizFn();
        setResultData(null);
    }

    if (generatingQuiz) {
        return <BarLoader className="mt-4" width={"100%"} color="gray" />
    }

   

    if(resultData){
        return (
            <div className="mx-2" >
                <QuizResult result={resultData} onStartNew={startNewQuiz} />
            </div>
        )
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

    const questionObject = quizData[currentQuestionIndex]; //currentQuestion is index and a state which is set to 0 at start

    /*Note : Here quizData is an array of objects (which is referred as 'questions' in the gemini prompt) 
    EG : quizData = [
        {
          "question": 
          "options": ["string" ,"string" , "string" , "string" ],
          "correctAnswer": "string",
          "explanation": "string"
        },
       {
          "question": 
          "options": ["string" ,"string" , "string" , "string" ],
          "correctAnswer": "string",
          "explanation": "string"
        },
      
        // ...and many more like this
      ] 
        
    SO let currentQuestion = 0 , then 
    quizData[currentQuestion] = { "question": "string" ,"options": [ ], "correctAnswer": "string","explanation": "string"
        }   */




    return (
       <Card className="bg-background border border-muted shadow-md">
  <CardHeader>
    <CardTitle className="text-xl md:text-2xl font-semibold text-primary">
      Question {currentQuestionIndex + 1} of {quizData.length}
    </CardTitle>
  </CardHeader>

  <CardContent>
    <p className="text-base md:text-lg font-medium mb-6">
      {questionObject.question}
    </p>

    <RadioGroup
      className="space-y-3 mb-6"
      onValueChange={handleAnswer}
      value={answers[currentQuestionIndex]}
    >
      {questionObject.options.map((option: string, index: number) => (
        <div
          key={index}
          className="flex items-center space-x-3 px-4 py-2 border rounded-md hover:bg-muted transition-colors"
        >
          <RadioGroupItem value={option} id={`option-${index}`} />
          <Label htmlFor={`option-${index}`} className="cursor-pointer">
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>

    {showExplanation && (
      <div className="mt-6 p-4 rounded-md bg-muted border text-sm leading-relaxed">
        <p className="font-medium mb-1">Explanation:</p>
        <p className="text-muted-foreground">{questionObject.explanation}</p>
      </div>
    )}
  </CardContent>

  <CardFooter className="flex justify-between items-center">
    {!showExplanation ? (
      <Button
        variant="outline"
        onClick={() => setShowExplanation(true)}
        disabled={!answers[currentQuestionIndex]}
      >
        Show Explanation
      </Button>
    ) : (
      <div />
    )}

    <Button
      onClick={handleNext}
      disabled={!answers[currentQuestionIndex] || savingResult}
    >
      {savingResult && (
        <Loader2 className="mr-2 animate-spin h-4 w-4" />
      )}
      {currentQuestionIndex < quizData.length - 1
        ? "Next Question"
        : "Finish Quiz"}
    </Button>
  </CardFooter>
</Card>

    )
}