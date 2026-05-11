# Project Instructions (GEMINI.md)

This file contains foundational mandates for the Gemini CLI agent. Adhere to these rules strictly.

## 1. Hallucination Prevention
- **Verify Before Action:** Never assume the existence of a file, variable, or function. Always use `ls`, `grep`, or `read_file` to confirm current state before proposing or implementing changes.
- **Empirical Evidence:** Base all technical decisions on the actual content of the codebase. If a library or framework is not explicitly imported or listed in configuration files (e.g., `package.json`), assume it is unavailable.
- **Fact-Checking:** If unsure about a command or API, use `google_web_search` or `web_fetch` to retrieve official documentation rather than guessing.

## 2. Context Persistence & Instruction Adherence
- **Mandate Primacy:** This `GEMINI.md` file takes absolute precedence. Review its contents at the start of every session.
- **Prompt Continuity:** Do not treat new prompts as isolated requests. Always consider the cumulative context of the current session and the project's established patterns.
- **Memory Maintenance:** Utilize the private `MEMORY.md` (if applicable) for workspace-specific notes that should not be committed, but rely on this `GEMINI.md` for shared team standards and architectural rules.

## 3. Engineering Standards
- **Surgical Edits:** When modifying code, keep changes targeted. Avoid unrelated refactoring unless explicitly requested.
- **Idiomatic Quality:** Match the style, naming conventions, and architectural patterns of the existing codebase.
- **Validation:** Every implementation task must include a validation step (tests, linting, or manual verification) to ensure correctness.

## 4. Communication
- **High Signal:** Maintain a professional, direct tone. Focus on technical rationale and intent.
- **Concise Updates:** Use `update_topic` to keep the user informed of strategic shifts or major phases, but avoid conversational filler.
