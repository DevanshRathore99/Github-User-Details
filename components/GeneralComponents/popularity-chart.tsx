"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"


export function PopularityChart({ data }: { data: { name: string, stars: number }[] }) {
  // console.log(data,'SSSSSSSSSSS')
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 150,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" domain={[0, 200]} tickCount={5} />
          <YAxis type="category" dataKey="label" tick={{ fontSize: 14 }} />
          <Tooltip formatter={(value) => [`${value} forks`, "Forks"]} labelStyle={{ color: "#333" }} />
          <Bar
            dataKey="value"
            fill="#8884d8"
            barSize={40}
            radius={[0, 4, 4, 0]}
            fillOpacity={0.9}
            label={{ position: "right", fill: "#666", fontSize: 14 }}
            isAnimationActive={true}
          >
            {/* {data.map((entry, index) => (
              <Bar key={`bar-${index}`} />
            ))} */}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
