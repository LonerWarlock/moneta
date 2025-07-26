"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle({
  className, ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  // We need `theme` to know the current state and `setTheme` to change it
  const { theme, setTheme } = useTheme();

  // This function will handle the toggle logic
  const toggleTheme = () => {
    // If the current theme is dark, switch to light. Otherwise, switch to dark.
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={className}
      onClick={toggleTheme}
      {...props}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}