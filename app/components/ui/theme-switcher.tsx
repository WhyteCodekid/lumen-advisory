import { Switch } from "@nextui-org/react";
import { Moon, Sun } from "../icons/theme";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <Switch
      isSelected={theme === "light"}
      onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      size="sm"
      color="default"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <Sun className={className} />
        ) : (
          <Moon className={className} />
        )
      }
    ></Switch>
  );
}
