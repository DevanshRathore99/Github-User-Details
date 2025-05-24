"use client"

import * as React from "react"
import { Legend, Pie, PieChart } from "recharts"
import {
  ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart"

export function LanguagesChart({ data }: { data: { label: string; value: number }[] }) {
  const chartData = data.map((lang, index) => ({
    name: lang.label,
    value: lang.value,
    fill: `hsl(var(--chart-${index + 1}))`,
  }))

  const chartConfig = data.reduce((acc, lang, index) => {
    acc[lang.label.toLowerCase()] = {
      label: lang.label,
      color: `hsl(var(--chart-${index + 1}))`,
    };
    return acc;
  }, {} as ChartConfig);

  // const total = chartData.reduce((acc, curr) => acc + curr.value, 0)
// console.log(chartData)
  return (

    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          innerRadius={50}
          strokeWidth={50}
        />
          <Legend verticalAlign="bottom" height={40} iconType="circle" wrapperStyle={{ paddingTop: "20px" }} />
      </PieChart>
    </ChartContainer>

  )
}


// "use client"

// import { Pie, PieChart } from "recharts"

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartLegend,
//   ChartLegendContent,
// } from "@/components/ui/chart"
// const chartData = [
//   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//   { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
//   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//   { browser: "other", visitors: 90, fill: "var(--color-other)" },
// ]

// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//   },
//   chrome: {
//     label: "Chrome",
//     color: "hsl(var(--chart-1))",
//   },
//   safari: {
//     label: "Safari",
//     color: "hsl(var(--chart-2))",
//   },
//   firefox: {
//     label: "Firefox",
//     color: "hsl(var(--chart-3))",
//   },
//   edge: {
//     label: "Edge",
//     color: "hsl(var(--chart-4))",
//   },
//   other: {
//     label: "Other",
//     color: "hsl(var(--chart-5))",
//   },
// } satisfies ChartConfig

// export function LanguagesChart() {
//   return (
   
//         <ChartContainer
//           config={chartConfig}
//           className="mx-auto aspect-square max-h-[300px]"
//         >
//           <PieChart>
//             <Pie data={chartData} dataKey="visitors" />
//             <ChartLegend
//               content={<ChartLegendContent nameKey="browser" />}
//               className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
//             />
//           </PieChart>
//         </ChartContainer>
    
//   )
// }
