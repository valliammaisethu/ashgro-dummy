import React, {
  useContext,
  createContext,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  useEffect,
} from "react";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";

export type ThemeMode = "light" | "dark";

export interface ThemeState {
  mode: ThemeMode;
}

type SetThemeState = Dispatch<SetStateAction<ThemeState>>;

const getInitialTheme = (): ThemeMode => {
  const storedTheme = localStorageHelper.getItem(LocalStorageKeys.THEME);
  if (storedTheme && (storedTheme === "light" || storedTheme === "dark")) {
    return storedTheme;
  }
  return "light";
};

const ThemeContent = createContext<[ThemeState, SetThemeState] | undefined>(
  undefined,
);

const ThemeContext = () => {
  const context = useContext(ThemeContent);
  if (!context) {
    throw new Error(`ThemeContext must be used within a ThemeProvider`);
  }

  const [theme, setTheme] = context;

  const toggleTheme = () => {
    const newMode: ThemeMode = theme.mode === "light" ? "dark" : "light";
    setTheme({ mode: newMode });
    localStorageHelper.setItem(LocalStorageKeys.THEME, newMode);
    applyTheme(newMode);
  };

  const applyTheme = (mode: ThemeMode) => {
    const root = document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark-mode");
      root.classList.remove("light-mode");
    } else {
      root.classList.add("light-mode");
      root.classList.remove("dark-mode");
    }
  };

  useEffect(() => {
    applyTheme(theme.mode);
  }, [theme.mode]);

  return {
    mode: theme.mode,
    toggleTheme,
  };
};

export const ThemeProvider = ({
  values,
  children,
}: PropsWithChildren<{ values?: ThemeState }>) => {
  const [theme, setTheme] = useState<ThemeState>(
    values || { mode: getInitialTheme() },
  );

  const value = useMemo(
    () => [theme, setTheme] as [ThemeState, SetThemeState],
    [theme],
  );

  return <ThemeContent.Provider value={value}>{children}</ThemeContent.Provider>;
};

export { ThemeContext };
