"use client"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  value: {
    label: "stars",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

const CustomTick = ({ x, y, payload }: any) => {
  const words = payload.value.length > 10
    ? [payload.value.slice(0, 10), payload.value.slice(10)]
    : [payload.value];

  return (
    <g transform={`translate(${x},${y})`}>
      {words.map((line, index) => (
        <text
          key={index}
          x={0}
          y={index * 12}
          dy={8}
          textAnchor="middle"
          fill="#666"
          fontSize={10}
        >
          {line}
        </text>
      ))}
    </g>
  );
};

export function StarsChart({ data }: { data: any }) {
  // console.log("stars chart data", data)
  return (
      <ChartContainer className="h-full" config={chartConfig}>
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            tickMargin={7}
            axisLine={false}
            interval={0}
            tick={<CustomTick />}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent nameKey="value" />}
          />
          <Bar dataKey="value" fill="var(--color-value)" radius={5} />
        </BarChart>
      </ChartContainer>

  )
}
