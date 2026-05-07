export const replaceWordAtCursor = (
  text: string,
  replacement: string,
  start: number,
  end: number,
): string => {
  return text.slice(0, start) + replacement + text.slice(end);
};
