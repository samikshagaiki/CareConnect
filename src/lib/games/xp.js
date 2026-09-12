export const XP = {
  NATURE_TASK: 2,

  NATURE_COMPLETE: 20,

  BINGO_CELL: 2,

  BINGO_ROW: 15,

  BINGO_COMPLETE: 50,
};

export function getLevel(xp) {
  return Math.floor(xp / 100) + 1;
}