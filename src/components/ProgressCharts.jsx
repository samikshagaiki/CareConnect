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
  moods,
  assessments,
}) {
  const moodData =
    moods.map((mood) => ({
      date: new Date(
        mood.createdAt
      ).toLocaleDateString(),

      score:
        moodScores[
          mood.mood
        ],
    }));

  const phqData =
    assessments
      .filter(
        (assessment) =>
          assessment.score > 0
      )
      .map(
        (assessment) => ({
          date: new Date(
            assessment.submittedAt
          ).toLocaleDateString(),

          score:
            assessment.score,
        })
      );

  return (
    <div className="grid gap-6 md:grid-cols-2">

      {/* Mood Trend */}

      <div className="rounded-3xl border p-6">
        <h2 className="mb-4 text-xl font-bold">
          Mood Trend
        </h2>

        <div className="h-72">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart
              data={moodData}
            >
              <CartesianGrid
                strokeDasharray="3 3"
              />

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
      </div>

      {/* PHQ-9 Trend */}

      <div className="rounded-3xl border p-6">
        <h2 className="mb-4 text-xl font-bold">
          PHQ-9 Trend
        </h2>

        <div className="h-72">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart
              data={phqData}
            >
              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="date"
              />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="score"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}