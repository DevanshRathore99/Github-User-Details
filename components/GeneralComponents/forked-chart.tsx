"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"

// Sample data
const data = [
  { name: "Twitter-clone", forks: 0 },
  { name: "portfolio", forks: 0 },
  { name: "dashboard", forks: 0 },
]

export function ForkedChart() {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: "hsl(var(--border))" }} />
          <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: "hsl(var(--border))" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              borderRadius: "0.5rem",
              boxShadow: "var(--shadow)",
            }}
          />
          <Bar dataKey="forks" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
