"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Force light theme and disable system theme detection
  const modifiedProps = {
    ...props,
    defaultTheme: "light",
    enableSystem: false,
    forcedTheme: "light",
    themes: ["light"], // Only allow light theme
    disableTransitionOnChange: true,
  };

  return <NextThemesProvider {...modifiedProps}>{children}</NextThemesProvider>;
}
