import React, { forwardRef } from "react";

interface Props {
  text: string;
  ghostText: string;
  cursorPosition: number;
}

// forwardRef use kar rahe hain taaki parent component isko control kar sake
const GhostTextOverlay = forwardRef<HTMLDivElement, Props>(
  ({ text, ghostText, cursorPosition }, ref) => {
    const beforeGhost = text.slice(0, cursorPosition);
    const afterGhost = text.slice(cursorPosition);

    return (
      <div
        ref={ref}
        // overflow-hidden is important here so it doesn't show its own scrollbar
        className="absolute inset-0 pointer-events-none whitespace-pre-wrap break-words border border-transparent p-3 font-mono text-sm overflow-hidden"
        aria-hidden="true"
      >
        <span className="text-transparent">{beforeGhost}</span>
        {/* The Ghost Text styling with Tailwind */}
        <span className="text-slate-400 opacity-60 italic select-none">
          {ghostText}
        </span>
        <span className="text-transparent">{afterGhost}</span>
      </div>
    );
  },
);

GhostTextOverlay.displayName = "GhostTextOverlay";

export default GhostTextOverlay;
