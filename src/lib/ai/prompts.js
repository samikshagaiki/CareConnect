export const NATURE_PROMPT = `
Generate a daily nature scavenger hunt.

Return ONLY this JSON:

{
  "title":"Nature Scavenger Hunt",

  "description":"One motivational sentence.",

  "rewardXP":20,

  "tasks":[

    {
      "id":1,

      "title":"",

      "category":"",

      "difficulty":"",

      "xp":2,

      "hint":""
    }

  ]

}

Generate exactly 10 tasks.

Allowed categories:

flower
tree
leaf
bird
cloud
water
rock
mushroom
butterfly
grass
wind
sun
fruit
pinecone
bug

Allowed difficulties:

easy
medium
hard

Easy XP = 2

Medium XP = 3

Hard XP = 5

Return ONLY JSON.
`;