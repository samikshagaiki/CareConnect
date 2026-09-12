import { naturePool } from "./naturePool";

export function generateNatureChallenge() {

  const shuffled = [...naturePool]
    .sort(() => Math.random() - 0.5);

  return shuffled
    .slice(0, 10)
    .map((task) => ({
      text: task,
    }));

}