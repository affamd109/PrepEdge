import { z } from "zod";
import { resumeSchema } from "@/app/lib/schemas";

export type UserUpdateInput = {
  industry: string;
  experience: number;
  bio: string;
  skills: string[];

}

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

 export type Industry = {
        id: string;
        name: string;
        subIndustries: string[];
    }

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

export type Entry = {
  title: string;
  organization: string;
  startDate: string;
  endDate?: string;
  description: string;
  current?: boolean;
};

export type EntryFormProps = {
  type: "Experience" | "Projects" | "Education";
    entries : Entry[];
  onChange: (updatedEntries: Entry[]) => void;
}


export type ResumeContent = z.infer<typeof resumeSchema>;

export const EMPTY_RESUME_CONTENT: ResumeContent = {
  contactInfo: {
    email: "",
    mobile: "",
    github: "",
    linkedIn: "",
  },
  summary: "",
  skills: "",
  experience: [],
  education: [],
  projects: [],
};