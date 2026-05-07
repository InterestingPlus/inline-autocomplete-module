export interface SuggestionItem {
  word: string;
  category: string;
  aliases: string[];
}

export interface AutocompleteState {
  suggestion: string;
  ghostText: string;
  startIndex: number;
  endIndex: number;
}
