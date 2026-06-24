"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const moodScores = {
  very_happy: 5,
  happy: 4,
  neutral: 3,
  sad: 2,
  very_sad: 1,
};

export default function ProgressCharts({
  data = [],
  type,
}) {
  const chartData =
  type === "mood"
    ? (data || []).map((mood) => ({
        date: new Date(
          mood.createdAt
        ).toLocaleDateString(),
        score:
          moodScores[mood.mood],
      }))
    : (data || [])
        .filter(
          (item) =>
            item.score > 0
        )
        .map((item) => ({
          date: new Date(
            item.submittedAt
          ).toLocaleDateString(),
          score:
            item.score,
        }));

       

  return (
    <div className="h-80">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <LineChart
          data={chartData}
        >
          <CartesianGrid
            strokeDasharray="5 5"
            stroke={
              type === "mood"
                ? "#D9EEFF"
                : "#E9D5FF"
            }
          />

          <XAxis
            dataKey="date"
          />

          <YAxis />

          <Tooltip
            contentStyle={{
              borderRadius:
                "16px",
              border: "none",
              boxShadow:
                "0 8px 20px rgba(0,0,0,0.08)",
            }}
          />

          <Line
            type="monotone"
            dataKey="score"
            stroke={
              type === "mood"
                ? "#38BDF8"
                : "#A855F7"
            }
            strokeWidth={4}
            dot={{
              r: 6,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}