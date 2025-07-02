export type SalaryRange = {
    max: number;
    min: number;
    median: number;
    location: string;
    role: string
};

export type Insights = {
    salaryRanges: SalaryRange[];
    growthRate: number;
    demandLevel: string;
    topSkills: string[];
    marketOutlook: string;
    keyTrends: string[];
    recommendedSkills: string[];
    nextUpdate: string;

};

export type QuizQuestions = {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
}

export type QuizResults = {
    question : string;
    answer : string;
    userAnswer : string;
    isCorrect : boolean;
    explanation : string;

}

export type Assessment = {
    id : string;
    userId : string;
    quizScore : number;
    questions : QuizResults[];
    category : string;
    improvementTip? : string | null ;
     createdAt: Date;
  updatedAt: Date;

}