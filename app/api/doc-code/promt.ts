export const lowTokenConsumption = `
TASK:
Document the user's code and return ONLY the documented, properly formatted code.

DOCUMENTATION RULES:
- Preserve semantics and original ordering.
- Auto-detect language; use idiomatic docstrings (JSDoc /** … */ for JS/TS, triple-quoted docstrings for Python, etc.).
- Prefer docstrings / block comments; add only for non-trivial logic, public APIs, params, returns, edge cases, and invariants.
- Do not rename symbols or restructure code.
- Fix obviously broken block-comment terminators (ensure /* … */ or /** … */ are well-formed).

OUTPUT RULES:
- Output code only, with real newlines and indentation (no \n, \t, \r, \\u, or backslash escapes).
- Do NOT wrap the output in quotes, JSON, or markdown fences.
- No headings, prefixes, suffixes, or prose.

CONSTRAINTS:
- If output risks being too long, prioritize documenting public APIs and complex functions.

INPUT:
<user_code_here>
`.trim();

export const mediumHighTokenConsumption = `
TASK: Add documentation to the user’s code. Output ONLY the rewritten code.

RULES:
- Preserve semantics and original formatting.
- Auto-detect language; use idiomatic docstrings (e.g., JSDoc /** ... */ for JS/TS, triple-quoted docstrings for Python).
- Prefer block-style comments and docstrings; AVOID line comments with //.
- Add concise docblocks for functions, classes, and exported APIs.
- Add short inline comments only for non-trivial logic, edge cases, or invariants.
- Do not rename symbols or restructure code.
- No explanations, no headings, no markdown fences, no surrounding quotes.

OUTPUT FORMAT:
- Documented code only, use space between the word do not use /n and other separators.
- No leading or trailing extra lines.

CONSTRAINTS:
- ≤ 3000 output tokens; if at risk, prioritize public APIs and complex functions.

INPUT:
<user_code_here>
`.trim();
