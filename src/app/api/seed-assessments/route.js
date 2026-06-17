import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import AssessmentTemplate from "@/models/AssessmentTemplate";

export async function GET() {
  try {
    await connectDB();

    await AssessmentTemplate.deleteMany({
      type: "standard",
    });

    await AssessmentTemplate.create({
      title: "PHQ-9",

      description:
        "Depression screening assessment",

      type: "standard",

      scoringEnabled: true,

      questions: [
        {
          question:
            "Little interest or pleasure in doing things?",
          options: [
            "Not at all",
            "Several days",
            "More than half the days",
            "Nearly every day",
          ],
        },

        {
          question:
            "Feeling down, depressed, or hopeless?",
          options: [
            "Not at all",
            "Several days",
            "More than half the days",
            "Nearly every day",
          ],
        },

        {
          question:
            "Trouble falling asleep or sleeping too much?",
          options: [
            "Not at all",
            "Several days",
            "More than half the days",
            "Nearly every day",
          ],
        },

        {
          question:
            "Feeling tired or having little energy?",
          options: [
            "Not at all",
            "Several days",
            "More than half the days",
            "Nearly every day",
          ],
        },

        {
          question:
            "Poor appetite or overeating?",
          options: [
            "Not at all",
            "Several days",
            "More than half the days",
            "Nearly every day",
          ],
        },

        {
          question:
            "Feeling bad about yourself?",
          options: [
            "Not at all",
            "Several days",
            "More than half the days",
            "Nearly every day",
          ],
        },

        {
          question:
            "Trouble concentrating?",
          options: [
            "Not at all",
            "Several days",
            "More than half the days",
            "Nearly every day",
          ],
        },

        {
          question:
            "Moving or speaking slowly, or being restless?",
          options: [
            "Not at all",
            "Several days",
            "More than half the days",
            "Nearly every day",
          ],
        },

        {
          question:
            "Thoughts of self-harm or being better off dead?",
          options: [
            "Not at all",
            "Several days",
            "More than half the days",
            "Nearly every day",
          ],
        },
      ],
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}