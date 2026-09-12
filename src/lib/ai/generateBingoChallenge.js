import { openai } from "./openai";

export async function generateBingoChallenge() {

  try {

    const completion =
      await openai.chat.completions.create({

        model: "gpt-4.1-mini",

        temperature: 0.8,

        response_format: {
          type: "json_object",
        },

        messages: [

          {
            role: "system",

            content: `
Generate a DAILY Wellness Bingo board.

Return ONLY JSON.

Exactly 15 activities.

Each activity should contain:

{
"title":"",
"icon":"",
"difficulty":"",
"xp":number
}

Allowed icons:

water
walk
journal
music
phone
fruit
flower
tree
sun
moon
wind
heart
exercise
smile
tea

Difficulty:
easy
medium
hard

XP:
easy=2
medium=3
hard=5

Also include:

title
description
rewardXP

No medical advice.
Activities should be positive,
simple,
under 6 words.
`,
          },

        ],

      });

    return JSON.parse(
      completion.choices[0].message.content
    );

  }

  catch {

    return null;

  }

}