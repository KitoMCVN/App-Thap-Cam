import React ,{ createContext, useContext, useEffect, useMemo, useState } from "react";
import en from '../locales/en.json';
import vi from '../locales/vi.json';

type Translations = {
  [key: string]: string;
};
type Language = "en" | "vi";
const translations: Record<Language, Translations> = { en, vi };

interface ILanguageContext {
  language: Language
  setLanguage: React.Dispatch<React.SetStateAction<Language>>
  t: (key: string) => string
  h: () => void
}

const LanguageContext = createContext<ILanguageContext>({} as ILanguageContext);

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [language, setLanguage] = useState<Language>(() => {
    return localStorage.getItem("application_language") as Language || "vi";
  });

  const translate = (key: string) => {
    return translations[language][key] || key;
  };
  const handlerToChangeLanguage = () => {
    setLanguage((prev) => prev == "vi" ? "en" : "vi");
    
  }
  useEffect(() => {
    localStorage.setItem("application_language", language)
  }, [language]);
  const contextValue = useMemo(() => ({ language, setLanguage, t: translate, h: handlerToChangeLanguage }), [language, setLanguage]);
  
  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useContext need to use within Language");
  return context;
};