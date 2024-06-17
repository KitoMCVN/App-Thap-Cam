import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "dark" | "light";

interface IThemeContext {
    theme: Theme
    setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [theme, setTheme] = useState<Theme>(() => {
        return localStorage.getItem("application_theme") as Theme || "dark"; 
    });

    useEffect(() => {
        localStorage.setItem("application_theme", theme);
    
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
    }, [theme])
    const contextValue = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);
    return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
    return useContext(ThemeContext);
}