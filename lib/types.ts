export type SalaryRange = {
    max : number;
    min: number;
    median : number;
    location : string ;
    role : string
};

export type Insights = {
    salaryRanges : SalaryRange[];
    growthRate : number;
    demandLevel: string;
    topSkills : string[];
    marketOutlook : string;
    keyTrends : string[];
    recommendedSkills: string[];
    nextUpdate: string;

};