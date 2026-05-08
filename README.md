# Smart Inline Autocomplete Component

A reusable VS Code-style inline autocomplete component built using Astro + React.

This module provides ghost text suggestions with Tab-based word completion using a local structured dataset and fuzzy search matching.

---

# Features

- Inline ghost text suggestions
- Tab-to-complete functionality
- Fuzzy search matching
- Keyboard-first interaction
- Local dataset support
- Reusable component architecture
- Desktop-focused implementation
- Lightweight and scalable structure

---

# Tech Stack

- Astro
- React
- TypeScript
- Tailwind CSS
- Fuse.js

---

# Project Structure

```txt
src/
 ├── components/
 │    ├── autocomplete/
 │    │     ├── SmartAutocomplete.tsx
 │    │     ├── SmartAutocomplete.css
 │    │     ├── GhostTextOverlay.tsx
 │    │     ├── useAutocomplete.ts
 │    │     ├── types.ts
 │
 ├── data/
 │    ├── suggestions.json
 │
 ├── utils/
 │    ├── getCurrentWord.ts
 │    ├── replaceWordAtCursor.ts
 │    ├── fuseSearch.ts
 │
 ├── pages/
 │    ├── index.astro
```

---

# Installation

Clone the repository:

```bash
git clone https://github.com/InterestingPlus/inline-autocomplete-module
```

Move into project directory:

```bash
cd inline-autocomplete-module
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

---

# How It Works

1. User types inside textarea
2. Current word is detected using cursor position
3. Fuse.js performs fuzzy search on local dataset
4. Best matched suggestion is selected
5. Remaining text is displayed as ghost suggestion
6. User presses `Tab` to complete the word

Example:

```txt
Input:
anx

Suggestion:
anxiety

Ghost Text:
iety
```

---

# Dataset Structure

Example:

```json
[
  {
    "word": "anxiety",
    "category": "symptom",
    "aliases": ["stress", "panic"]
  }
]
```

---

# Current Scope

This version currently supports:

- Word completion only
- Inline ghost text
- Desktop-first interaction
- Local dataset approach

---

# Future Improvements

Possible future enhancements:

- Dropdown suggestions
- Sentence completion
- AI-powered contextual prediction
- Mobile/touch support
- User-based suggestion ranking
- Backend-managed datasets

---

# Live Demo

https://smart-autocomplete.netlify.app/

---

# GitHub Repository

https://github.com/InterestingPlus/inline-autocomplete-module

---

# Author

Developed as part of internship work for production-level reusable frontend component research and implementation.

(Aroha Health)[https://www.linkedin.com/company/arohahealth]
