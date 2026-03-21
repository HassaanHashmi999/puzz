const STORAGE_KEY = 'puzzleGameProgress';

export const getCompletedPuzzles = (): number[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const isPuzzleUnlocked = (id: number): boolean => {
  const completed = getCompletedPuzzles();
  if (id === 1) return true;
  return completed.includes(id - 1);
};

export const completePuzzle = (id: number): void => {
  if (typeof window === 'undefined') return;
  const completed = getCompletedPuzzles();
  if (!completed.includes(id)) {
    completed.push(id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  }
};

export const resetProgress = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
};

export const getNextPuzzle = (): string => {
  const completed = getCompletedPuzzles();
  if (completed.length === 0) return "/puzzles/1";
  const max = Math.max(...completed);
  if (max >= 9) return "/reveal";
  return `/puzzles/${max + 1}`;
};

export const setProgressTo = (puzzleNumber: number): void => {
  if (typeof window === 'undefined') return;
  const completed = [];
  for (let i = 1; i <= puzzleNumber; i++) {
    completed.push(i);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
};