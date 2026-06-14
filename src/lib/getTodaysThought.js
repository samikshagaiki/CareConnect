import PositiveThought from "@/models/PositiveThought";

export async function getTodaysThought() {
  const month = new Date().getMonth() + 1;

  const day = new Date().getDay();

  
console.log("Month:", month);

const thoughtDoc =
  await PositiveThought.findOne({
    month,
  });

console.log("Thought Doc:", thoughtDoc);

  if (
    !thoughtDoc ||
    thoughtDoc.thoughts.length === 0
  ) {
    return "Every day is a new opportunity to grow.";
  }

  return thoughtDoc.thoughts[day];
}

