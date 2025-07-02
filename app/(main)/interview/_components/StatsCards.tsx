import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Assessment } from "@/lib/types";
import { Brain, TrendingUp, Trophy } from "lucide-react";

export default function StatsCards({ assessments }: { assessments: Assessment[] }) {
    //Assessment will give an object which contains many thing.. just look in lib/types.ts

    const getAverageScore = () => {
        if (!assessments?.length) return 0;

        const total = assessments.reduce((sum, assessment) => sum + assessment.quizScore, 0)

        return (total / assessments.length).toFixed(1);

    }






    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mx-4 md:mx-0">

            <Card  className="bg-black border-gray-600">
                <CardHeader className="flex flex-row items-center justify-between ">
                    <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>

                <CardContent>
                    <div className="text-2xl font-bold mb-1">{getAverageScore()}%</div>
                    <p className="text-xs text-muted-foreground">
                        Across all assessments
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-black border-gray-600">
                <CardHeader className="flex flex-row items-center justify-between ">
                    <CardTitle className="text-sm font-medium">Questiosn practiced by you </CardTitle>
                    <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>

                <CardContent>
                    <div className="text-2xl font-bold mb-1">{assessments.length}</div>
                    <p className="text-xs text-muted-foreground">
                        Total questions 
                    </p>
                </CardContent>
            </Card>


            <Card className="bg-black border-gray-600">
                <CardHeader className="flex flex-row items-center justify-between ">
                    <CardTitle className="text-sm font-medium">Latest score </CardTitle>
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>

                <CardContent>
            <div className="text-2xl font-bold mb-1">{assessments[0].quizScore.toFixed(1) || 0 }%</div>
                    <p className="text-xs text-muted-foreground">
                        scored in last assessment
                    </p>
                </CardContent>
            </Card>




        </div>
    )
}
