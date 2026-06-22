export const WEEKDAYS = [
  "sun",
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat"
] as const;

export const HABIT_ICONS = [
  "water-outline",
  "dumbbell",
  "book-open-outline",
  "meditation",
  "run",
  "piggy-bank-outline",
  "silverware-fork-knife",
  "weather-night",
  "code-tags",
  "pencil-outline",
  "hand-wash-outline",
  "dots-horizontal"
] as const;
export type HabitIcon = (typeof HABIT_ICONS)[number];

export const HABIT_COLORS = [
  "#2170E4", // Blue
  "#6CF8BB", // Light green
  "#B75B00", // Orange/Brown
  "#FFDAD6", // Pink light
  "#8B5CF6", // Purple
  "#EC4899" // Pink strong
] as const;
export type HabitColor = (typeof HABIT_COLORS)[number];
