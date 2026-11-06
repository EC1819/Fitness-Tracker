import { useState } from "react";
import { applyTheme, storeTheme } from "../theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
      () => document.documentElement.dataset.theme || "light"
  );
  const nextTheme = theme === "dark" ? "light" : "dark";

  function handleClick() {
    applyTheme(nextTheme);
    storeTheme(nextTheme);
    setTheme(nextTheme);
  }

  return (
      <button
          type="button"
          className="theme-toggle"
          onClick={handleClick}
          aria-label={`Switch to ${nextTheme} theme`}
      >
        {nextTheme === "dark" ? "Dark" : "Light"}
      </button>
  );
}
