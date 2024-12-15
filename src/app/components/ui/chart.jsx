"use client"

import React from 'react';
import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Card } from "@/components/ui/card";

export const BarChart = ({
  data,
  index,
  categories,
  valueFormatter,
  yAxisWidth = 56,
  height = 400,
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data}>
        <XAxis
          dataKey={index}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          width={yAxisWidth}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <Card className="py-2 px-3 bg-white text-gray-800 shadow-md">
                  <div className="grid gap-2">
                    <div className="flex flex-col items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#605CFF]" />
                        <span className="font-[600]">{payload[0].name}</span>
                      </div>
                      <span className="font-[500] opacity-80">
                        {valueFormatter(payload[0].value)}
                      </span>
                    </div>
                  </div>
                </Card>
              );
            }
            return null;
          }}
        />
        {categories.map((category) => (
          <Bar
            key={category}
            dataKey={category}
            fill="#605CFF" // Hex code for Tailwind's `green-900`
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};
