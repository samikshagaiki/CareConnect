
import { gemini } from "@/lib/ai/gemini";

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

export async function generateAssessmentReport({
  template,
  answers,
}) {
  if (!template || !Array.isArray(template.questions)) {
    throw new Error("Invalid assessment template");
  }

  if (!Array.isArray(answers)) {
    throw new Error("Invalid assessment answers");
  }

  if (answers.length !== template.questions.length) {
    throw new Error("The number of answers does not match the questions");
  }

  // Convert the stored numeric answer indexes into readable options.
  const responses = template.questions.map((question, index) => {
    const selectedIndex = answers[index];
    const options = question.options || [];

    const selectedAnswer =
      Number.isInteger(selectedIndex) &&
      selectedIndex >= 0 &&
      selectedIndex < options.length
        ? options[selectedIndex]
        : `Answer index: ${selectedIndex}`;

    return {
      question: question.question,
      selectedAnswer,
    };
  });

  const prompt = `
You are assisting a qualified counselor by organizing a patient's
assessment responses into a neutral, non-diagnostic summary.

Assessment title:
${template.title}

Assessment description:
${template.description || "Not provided"}

Patient responses:
${JSON.stringify(responses, null, 2)}

Generate a structured report with these fields:

{
  "overview": "A short overview of the submitted assessment",
  "responseSummary": "A neutral summary of the patient's selected responses",
  "observedPatterns": ["Pattern supported by the responses"],
  "areasForDiscussion": ["Topic the counselor may want to explore"],
  "positiveIndicators": ["Positive or constructive indicators, if present"],
  "suggestedQuestions": ["Open-ended question the counselor may ask"],
  "limitations": "Explain that this is an AI-generated summary, not a diagnosis"
}

Important instructions:
- Base every observation strictly on the provided responses.
- Do not invent patient history or missing information.
- Do not diagnose any mental health condition.
- Do not assign a severity or risk level.
- Do not recommend medication or treatment.
- Do not make assumptions about the patient's personality.
- Use neutral, respectful and non-judgmental language.
- If there is insufficient information for a pattern, say so.
- The report is intended only as an aid for the counselor's review.
- Return valid JSON only.
`;

  const response = await gemini.models.generateContent({
    model: MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  const responseText = response.text;

  if (!responseText) {
    throw new Error("Gemini returned an empty response");
  }

  let report;

  try {
    report = JSON.parse(responseText);
  } catch {
    console.error("Invalid JSON returned by Gemini:", responseText);
    throw new Error("Gemini returned an invalid report format");
  }

  // Validate the generated report before saving it.
  const requiredStrings = [
    "overview",
    "responseSummary",
    "limitations",
  ];

  for (const field of requiredStrings) {
    if (typeof report[field] !== "string" || !report[field].trim()) {
      throw new Error(`Invalid or missing report field: ${field}`);
    }
  }

  const requiredArrays = [
    "observedPatterns",
    "areasForDiscussion",
    "positiveIndicators",
    "suggestedQuestions",
  ];

  for (const field of requiredArrays) {
    if (
      !Array.isArray(report[field]) ||
      !report[field].every((item) => typeof item === "string")
    ) {
      throw new Error(`Invalid report array: ${field}`);
    }
  }

  return {
    report,
    model: MODEL,
  };
}
