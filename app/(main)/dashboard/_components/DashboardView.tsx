"use client"
import { Badge } from "@/components/ui/badge";
import { Card,  CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Insights } from "@/lib/types";
import { BarChartIcon, Brain, BriefcaseIcon, LineChart, TrendingDown, TrendingUp } from "lucide-react";
import { BarChart, Bar,  XAxis, YAxis, CartesianGrid, Tooltip,  ResponsiveContainer } from 'recharts';


export default function DashboardView({ insights }: { insights: Insights }) {
    console.log(insights);
    const salaryData = insights.salaryRanges.map((range) => ({
        name: range.role,
        min: range.min / 1000,
        max: range.max / 1000,
        median: range.median / 1000
    }))

    const getDemandLevelColor = (level: Insights["demandLevel"]) => {
        switch (level.toLowerCase()) {
            case "high":
                return "bg-green-500";
            case "medium":
                return "bg-yellow-500";
            case "low":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };

    const getMarketOutlookInfo = (outlook: Insights["marketOutlook"]) => {
        switch (outlook.toLowerCase()) {
            case "positive":
                return { icon: TrendingUp, color: "text-green-500" };
            case "neutral":
                return { icon: LineChart, color: "text-yellow-500" };
            case "negative":
                return { icon: TrendingDown, color: "text-red-500" };
            default:
                return { icon: LineChart, color: "text-gray-500" };
        }
    };


    const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
    const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;


    return (

        <div className="space-y-13">

            


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <Card className="bg-black border-gray-600" >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Market Outlook
                        </CardTitle>
                        <OutlookIcon className={`h-8 w-8 ${outlookColor}`} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{insights.marketOutlook}</div>
                        <p className="text-xs text-muted-foreground pt-3" >Updated by AI</p>

                    </CardContent>
                </Card>

                <Card className="bg-black border-gray-600 ">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Industry Growth
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {insights.growthRate.toFixed(1)}%
                        </div>
                        <Progress value={insights.growthRate} className="mt-2" />
                    </CardContent>
                </Card>

                <Card className="bg-black border-gray-600">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Demand Level</CardTitle>
                        <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{insights.demandLevel}</div>
                        <div
                            className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(
                                insights.demandLevel
                            )}`}
                        />
                    </CardContent>
                </Card>

                <Card className="bg-black border-gray-600">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Top Skills</CardTitle>
                        <Brain className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-1">
                            {insights.topSkills.map((skill) => (
                                <Badge key={skill} variant="secondary">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>


            <Card className="bg-black border-gray-600">
                <CardHeader>
                    <CardTitle className="text-xl" >Salary range according to role</CardTitle>
                    <CardDescription>Display of mean , median and maximum salaries </CardDescription>

                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">

                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart

                                data={salaryData}

                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip  content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        return (
                   <div className="bg-background rounded-lg p-2 shadow-md border border-gray-400 " >
                       <p className="font-bold mb-2 " >{label}</p>
                                 {payload.map((item) => (
                                     <p className="text-sm text-muted-foreground" key={item.name}>
                                                        {item.name}-{item.value}K
                                                    </p>

                                                ))}
                                            </div>

                                        );
                                    }
                                    return null;
                                }} />

                               <Bar dataKey="min" fill="#334155" name="Min Salary" />     
<Bar dataKey="median" fill="#475569" name="Median Salary" /> 
<Bar dataKey="max" fill="#64748b" name="Max Salary" />   

                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>

            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" >

                 <Card className="bg-black border-gray-600">
  <CardHeader className="flex flex-row items-center justify-between pb-2">
    <div>
      <CardTitle className="text-2xl font-semibold">Industry Trends</CardTitle>
      <CardDescription>Current trends shaping the industry</CardDescription>
    </div>
    <BarChartIcon className="h-5 w-5 text-muted-foreground" />
  </CardHeader>

  <CardContent>
    <ul className="space-y-3">
      {insights.keyTrends.map((trend, index) => (
        <li key={index} className="flex items-start space-x-2 hover:text-primary transition-colors">
          <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span className="text-sm text-muted-foreground">{trend}</span>
        </li>
      ))}
    </ul>
  </CardContent>
</Card>



              <Card className="bg-black border-gray-600">
  <CardHeader >
    <CardTitle className="text-xl font-semibold">Recommended Skills</CardTitle>
    <CardDescription className="text-sm text-muted-foreground">
      Skills to consider developing to stay ahead
    </CardDescription>
    
  </CardHeader>

  <CardContent>
    <div className="flex flex-wrap gap-2">
      {insights.recommendedSkills.map((skill) => (
        <Badge
          key={skill}
          variant="outline"
          className="text-sm px-3 py-1 hover:bg-primary hover:text-white transition-colors duration-200"
        >
          {skill}
        </Badge>
      ))}
    </div>
  </CardContent>
</Card>




            </div>






        </div>






    )



}