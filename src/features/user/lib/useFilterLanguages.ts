import { useMemo } from "react";

export const useFilterLanguages = (
  languages: { code: string; name: string }[],
  query: string
) => {
  return useMemo(() => {
    if (!query) return languages;

    return languages.filter((language) =>
      language.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [languages, query]);
};
