import { browser } from "$app/environment";
import { writable } from "svelte/store";

export const theme = writable("light");

// Function to toggle the theme
export function toggleTheme() {
  theme.update((current: string | undefined) => {
    const newTheme = current === "light" ? "dark" : "light";
    // Set theme in localStorage so it persists across page reloads
    localStorage.setItem("theme", newTheme);
    return newTheme;
  });
  return "light";
}

if (typeof window !== "undefined" && window.localStorage) {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    theme.set(savedTheme);
  }
}
