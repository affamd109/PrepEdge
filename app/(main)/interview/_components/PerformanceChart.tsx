"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import {  Card,  CardContent,  CardDescription,  CardHeader,CardTitle,} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Assessment } from "@/lib/types";

export default function PerformanceChart({ assessments } : {assessments : Assessment[]}) {
  const [chartData, setChartData] = useState<{date : string ; score : number;}[]>([]);

  useEffect(() => {
    if (assessments) {
      const formattedData = assessments.map((assessment) => ({
        date: format(new Date(assessment.createdAt), "MMM dd"),
        score: Number(assessment.quizScore) || 0,
      }));
      setChartData(formattedData);
    }
  }, [assessments]);

  return (
    <Card className="bg-black border-gray-600 mx-2 md:mx-0">
      <CardHeader>
        <CardTitle className="gradient-title text-3xl md:text-4xl">
          Performance Trend
        </CardTitle>
        <CardDescription>Your quiz scores over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload?.length) {
                      return (
                        <div className="bg-background border rounded-lg p-2 shadow-md">
                          <p className="text-sm font-medium">
                            Score: {payload[0].value}%
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {payload[0].payload.date}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#FFFFFF" 
                  strokeWidth={3}
                  dot={{ fill: '#FFFFFF', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground text-lg">
              No quiz data available yet. Complete a quiz to see your performance!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
