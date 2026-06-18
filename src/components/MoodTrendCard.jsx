"use client";

import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const moodScores = {
  very_happy: 5,
  happy: 4,
  neutral: 3,
  sad: 2,
  very_sad: 1,
};

export default function MoodTrendCard() {
  const [data, setData] =
    useState([]);

  async function fetchMoodHistory() {
    try {
      const response =
        await fetch(
          "/api/patient/mood-history"
        );

      const result =
        await response.json();

      if (result.success) {
        const formatted =
          result.moods.map(
            (entry) => ({
              date:
                new Date(
                  entry.createdAt
                ).toLocaleDateString(),

              score:
                moodScores[
                  entry.mood
                ],
            })
          );

        setData(
          formatted
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchMoodHistory();
  }, []);

  return (
    <div className="rounded-3xl border bg-card p-6">
      <h3 className="font-semibold">
        Mood Trend
      </h3>

      {data.length === 0 ? (
        <p className="mt-3">
          No mood entries yet.
        </p>
      ) : (
        <div className="mt-4 h-60">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart
              data={data}
            >
              <XAxis
                dataKey="date"
              />

              <YAxis
                domain={[
                  1, 5,
                ]}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="score"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}