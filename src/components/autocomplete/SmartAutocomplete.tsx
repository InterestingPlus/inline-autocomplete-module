import React, { useState, useRef, useEffect } from "react";
import { useAutocomplete } from "./useAutocomplete";
import GhostTextOverlay from "./GhostTextOverlay";
import { replaceWordAtCursor } from "../../utils/replaceWordAtCursor";
import type { SuggestionItem } from "./types";

import "./SmartAutocomplete.css";

interface Props {
  data: SuggestionItem[];
  placeholder?: string;
  onChange?: (value: string) => void;
}

const SmartAutocomplete: React.FC<Props> = ({
  data,
  placeholder,
  onChange,
}) => {
  const [value, setValue] = useState("");
  const [cursorPos, setCursorPos] = useState(0);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const { state, updateSuggestion } = useAutocomplete(data);

  const handleScroll = () => {
    if (textareaRef.current && overlayRef.current) {
      overlayRef.current.scrollTop = textareaRef.current.scrollTop;
      overlayRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && state.ghostText) {
      e.preventDefault();

      const newValue = replaceWordAtCursor(
        value,
        state.suggestion,
        state.startIndex,
        state.endIndex,
      );

      setValue(newValue);
      const newCursorPos = state.startIndex + state.suggestion.length;
      setCursorPos(newCursorPos);
      updateSuggestion(newValue, newCursorPos);

      if (onChange) onChange(newValue);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    const pos = e.target.selectionStart;
    setValue(val);
    setCursorPos(pos);
    updateSuggestion(val, pos);
    if (onChange) onChange(val);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.selectionStart = cursorPos;
      textareaRef.current.selectionEnd = cursorPos;
    }
  }, [cursorPos]);

  return (
    // height fix kar di hai taaki scroll perfectly test ho sake
    <div className="relative w-full h-[250px] bg-white rounded-md shadow-sm">
      <GhostTextOverlay
        ref={overlayRef}
        text={value}
        ghostText={state.ghostText}
        cursorPosition={cursorPos}
      />
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onSelect={(e) => setCursorPos(e.currentTarget.selectionStart)}
        onScroll={handleScroll} // SCROLL LISTENER ATTACHED
        placeholder={placeholder}
        // inset-0 aur h-full lagaya hai taaki size exactly overlay jitna rahe
        className="absolute inset-0 w-full h-full bg-transparent p-3 font-mono text-sm text-slate-900 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
        spellCheck={false}
      />
    </div>
  );
};

export default SmartAutocomplete;
