import { Platform } from "react-native";

export const Colors = {
  light: {
    surface: "#f8f9fa",
    surfaceDim: "#d9dadb",
    surfaceContainerLowest: "#ffffff",
    surfaceContainerLow: "#f3f4f5",
    surfaceContainer: "#edeeef",
    surfaceContainerHigh: "#e7e8e9",
    surfaceContainerHighest: "#e1e3e4",
    onSurface: "#191c1d",
    onSurfaceVariant: "#424754",
    inverseSurface: "#2e3132",
    inverseOnSurface: "#f0f1f2",
    outline: "#727785",
    outlineVariant: "#c2c6d6",
    surfaceTint: "#005ac2",
    primary: "#0058be",
    onPrimary: "#ffffff",
    primaryContainer: "#2170e4",
    onPrimaryContainer: "#fefcff",
    inversePrimary: "#adc6ff",
    secondary: "#006c49",
    onSecondary: "#ffffff",
    secondaryContainer: "#6cf8bb",
    onSecondaryContainer: "#00714d",
    tertiary: "#924700",
    onTertiary: "#ffffff",
    tertiaryContainer: "#b75b00",
    onTertiaryContainer: "#fffbff",
    error: "#ba1a1a",
    onError: "#ffffff",
    errorContainer: "#ffdad6",
    onErrorContainer: "#93000a",
    primaryFixed: "#d8e2ff",
    primaryFixedDim: "#adc6ff",
    onPrimaryFixed: "#001a42",
    onPrimaryFixedVariant: "#004395",
    secondaryFixed: "#6ffbbe",
    secondaryFixedDim: "#4edea3",
    onSecondaryFixed: "#002113",
    onSecondaryFixedVariant: "#005236",
    tertiaryFixed: "#ffdcc6",
    tertiaryFixedDim: "#ffb786",
    onTertiaryFixed: "#311400",
    onTertiaryFixedVariant: "#723600",
    onBackground: "#191c1d",
    surfaceVariant: "#e1e3e4"
  },
  dark: {
    surface: "#111314",
    surfaceDim: "#0e0f10",
    surfaceContainerLowest: "#000000",
    surfaceContainerLow: "#141617",
    surfaceContainer: "#191c1d",
    surfaceContainerHigh: "#202324",
    surfaceContainerHighest: "#2b2e2f",
    onSurface: "#e1e3e4",
    onSurfaceVariant: "#c2c6d6",
    inverseSurface: "#e1e3e4",
    inverseOnSurface: "#2e3132",
    outline: "#8c9199",
    outlineVariant: "#424754",
    surfaceTint: "#adc6ff",
    primary: "#adc6ff",
    onPrimary: "#002e69",
    primaryContainer: "#004395",
    onPrimaryContainer: "#d8e2ff",
    inversePrimary: "#0058be",
    secondary: "#4edea3",
    onSecondary: "#003824",
    secondaryContainer: "#005236",
    onSecondaryContainer: "#6cf8bb",
    tertiary: "#ffb786",
    onTertiary: "#4d2200",
    tertiaryContainer: "#723600",
    onTertiaryContainer: "#ffdcc6",
    error: "#ffb4ab",
    onError: "#690005",
    errorContainer: "#93000a",
    onErrorContainer: "#ffdad6",
    primaryFixed: "#d8e2ff",
    primaryFixedDim: "#adc6ff",
    onPrimaryFixed: "#001a42",
    onPrimaryFixedVariant: "#004395",
    secondaryFixed: "#6ffbbe",
    secondaryFixedDim: "#4edea3",
    onSecondaryFixed: "#002113",
    onSecondaryFixedVariant: "#005236",
    tertiaryFixed: "#ffdcc6",
    tertiaryFixedDim: "#ffb786",
    onTertiaryFixed: "#311400",
    onTertiaryFixedVariant: "#723600",
    onBackground: "#e1e3e4",
    surfaceVariant: "#424754"
  }
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace"
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace"
  },
  web: {
    sans: "var(--font-display)",
    serif: "var(--font-serif)",
    rounded: "var(--font-rounded)",
    mono: "var(--font-mono)"
  }
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
