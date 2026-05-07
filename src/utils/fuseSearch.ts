import Fuse from "fuse.js";
import type { SuggestionItem } from "../components/autocomplete/types";

const options = {
  keys: ["word", "aliases"],
  threshold: 0.3, // Balanced fuzziness
  distance: 100,
  minMatchCharLength: 2,
};

export const initFuse = (data: SuggestionItem[]) => new Fuse(data, options);

export const getTopSuggestion = (
  fuse: Fuse<SuggestionItem>,
  query: string,
): string | null => {
  if (!query) return null;
  const results = fuse.search(query);
  if (results.length === 0) return null;

  const topResult = results[0].item.word;

  // Only suggest if the query is a prefix of the result to keep "ghost text" logic clean
  if (topResult.toLowerCase().startsWith(query.toLowerCase())) {
    return topResult;
  }

  return null;
};
