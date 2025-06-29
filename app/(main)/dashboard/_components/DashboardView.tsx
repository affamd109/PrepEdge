"use client"
import type { Insights } from "@/lib/types";

export default function DashboardView({insights} : {insights : Insights}){
        console.log(insights);
        const salaryData = insights.salaryRanges.map((range) => ({
            name : range.role,
            min : range.min/1000,
            max : range.max/1000,
            median : range.median/1000
        }))


    return (

        <div>
            Dashboard view


        </div>
    )



}