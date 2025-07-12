"use client";

import { Button } from "@/components/ui/button";
import { Card,  CardContent, CardDescription,  CardHeader, CardTitle } from "@/components/ui/card";
import { Assessment } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { format } from "date-fns";
import { Dialog, DialogContent,  DialogHeader, DialogTitle} from "@/components/ui/dialog";
import QuizResult from "./QuizResult";

export default function QuizList({ assessments }: { assessments: Assessment[] }) {
    const router = useRouter();

    const [selectedQuiz, setSelectedQuiz] = useState<Assessment | null>(null);





    return (
        <>
            <Card className="bg-black border-gray-600">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="gradient-title text-3xl md:text-4xl">
                                Recent Quizzes
                            </CardTitle>
                            <CardDescription>
                                Review your past quiz performance
                            </CardDescription>
                        </div>

                        <Button onClick={() => router.push("/interview/mock")} >Start new quiz </Button>

                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4" >
                        {assessments.slice(0,10).map((assessment, index) => (
                            <Card onClick={() => setSelectedQuiz(assessment)}
                             className="cursor-pointer hover:bg-muted/50 transition-colors" 
                            key={assessment.id} >
                                <CardHeader>

                                    <CardTitle>Quiz No : {index + 1}</CardTitle>
                                    <CardDescription className="flex justify-between w-full">
                                        <div>Your Score: {assessment.quizScore.toFixed(1)}%</div>
                                        <div>
                                            {format(
                                                new Date(assessment.createdAt),
                                                "MMMM dd, yyyy HH:mm"
                                            )}
                                        </div>
                                    </CardDescription>

                                </CardHeader>

                                {assessment.improvementTip && (
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">
                                            {assessment.improvementTip}
                                        </p>
                                    </CardContent>
                                )}
                            </Card>
                        ))}
                    </div>

                </CardContent>
            </Card>





{/* 
   <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <QuizResult
            result={selectedQuiz} 
            hideStartNew //This hides the Start new quiz button (refer to QuizResult )
            onStartNew={() => router.push("/interview/mock")}
          />
        </DialogContent>
      </Dialog> */}


      {/* Here dbl exclamation (!!) ensures "open" is strictly true or false — not undefined, null, or an object. 
onOpenChange : This gets triggered when the Dialog is closed (e.g., user clicks outside or presses Esc).

*/}

      {selectedQuiz && (
  <Dialog open={true} onOpenChange={() => setSelectedQuiz(null)}>
    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle></DialogTitle>
      </DialogHeader>
      <QuizResult
        result={selectedQuiz}
        hideStartNew
        onStartNew={() => router.push("/interview/mock")}
      />
    </DialogContent>
  </Dialog>
)}



        </>
    )
}
