// src/components/layout/theme-toggle-button.jsx
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder or null on the server and during initial client render
    // to avoid hydration mismatch if the theme is resolved differently.
    return (
        <Button
            variant="ghost"
            size="icon"
            disabled
            className="text-foreground hover:bg-muted rounded-full p-1.5 sm:p-2 opacity-50"
            aria-label="Toggle theme"
        >
            <Sun className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="text-foreground hover:bg-muted rounded-full p-1.5 sm:p-2"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 sm:h-6 sm:w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 sm:h-6 sm:w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
