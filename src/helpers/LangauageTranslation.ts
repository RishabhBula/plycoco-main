import englishLanguage from "../resource/language/en.json";
import germanLanguage from "../resource/language/de.json";

const Languages: any = {
  en: englishLanguage,
  de: germanLanguage
};
export const languageTranslation = (
  key: string,
  replacement: any = {}
): string => {
  let lang = localStorage.getItem("language") || "de";
  if (!Languages[lang]) {
    lang = "en";
  }
  const language: any = Languages[lang];
  let languageMessages = language[key];
  for (const k in replacement) {
    if (replacement.hasOwnProperty(k)) {
      const value = replacement[k];
      languageMessages = languageMessages.replace(
        new RegExp(`:${k}`, "g"),
        `${value}`
      );
    }
  }
  return languageMessages;
};
