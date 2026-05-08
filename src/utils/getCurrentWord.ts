export const getCurrentWord = (text: string, cursorPosition: number) => {
  const beforeCursor = text.slice(0, cursorPosition);
  const match = beforeCursor.match(/(\w+)$/);

  return {
    word: match ? match[0] : "",
    startIndex: match ? cursorPosition - match[0].length : cursorPosition,
    endIndex: cursorPosition,
  };
};
