import data from "./languages/data";
import { Config } from "./types/config";

const getConfig = (language: string): Config => {
  const defaultLang = "en";
  const langMap: { [key: string]: string } = {
    es: "es",
    "es-ES": "es",
    "pt-BR": "pt",
    pt: "pt",
    ru: "ru",
    "ru-RU": "ru",
    zh: "zh",
    "zh-CN": "zh",
    "zh-TW": "zh",
    ar: "ar",
    "ar-SA": "ar",
  };

  const langKey = langMap[language] || defaultLang;
  return data[langKey as keyof typeof data];
};

export default getConfig;
