"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MoodTrendChart({
  data,
}) {
  return (
    <ResponsiveContainer
      width="100%"
      height={250}
    >
      <LineChart data={data}>
        <XAxis
          dataKey="date"
        />

        <YAxis
          domain={[1, 5]}
        />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="score"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}