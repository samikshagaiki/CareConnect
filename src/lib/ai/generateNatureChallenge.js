import { openai } from "./openai";
import { NATURE_PROMPT } from "./prompts";

export async function generateNatureChallenge() {

  try {

    const response =
      await openai.chat.completions.create({

        model: "gpt-4.1-mini",

        temperature: 0.9,

        messages: [

          {
            role: "system",
            content: NATURE_PROMPT,
          },

        ],

        response_format: {
          type: "json_object",
        },

      });

    const content =
      response.choices[0].message.content;

    const parsed =
      JSON.parse(content);

    return parsed.tasks;

  }

  catch (error) {

    console.error(
      "Nature AI Error:",
      error
    );

    return null;

  }

}