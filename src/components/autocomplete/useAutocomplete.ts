import { useState, useMemo } from "react";
import { initFuse, getTopSuggestion } from "../../utils/fuseSearch";
import { getCurrentWord } from "../../utils/getCurrentWord";
import type { SuggestionItem, AutocompleteState } from "./types";

export const useAutocomplete = (data: SuggestionItem[]) => {
  const [state, setState] = useState<AutocompleteState>({
    suggestion: "",
    ghostText: "",
    startIndex: 0,
    endIndex: 0,
  });

  const fuse = useMemo(() => initFuse(data), [data]);

  const updateSuggestion = (text: string, cursorPosition: number) => {
    const { word, startIndex, endIndex } = getCurrentWord(text, cursorPosition);

    if (word.length < 2) {
      setState({ suggestion: "", ghostText: "", startIndex, endIndex });
      return;
    }

    const suggestion = getTopSuggestion(fuse, word);

    if (suggestion) {
      const ghost = suggestion.slice(word.length);
      setState({ suggestion, ghostText: ghost, startIndex, endIndex });
    } else {
      setState({ suggestion: "", ghostText: "", startIndex, endIndex });
    }
  };

  return { state, updateSuggestion };
};
