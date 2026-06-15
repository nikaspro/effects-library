# Valera Motion Library

## Source of truth

- Always inspect `catalog.json` before choosing or implementing an animation.
- Use only effects with `status: approved`.
- Local effect source code lives in `effects/<effect-id>/`.
- Prefer local implementations over external embeds or CodePen.
- Preserve source attribution and reference metadata for third-party effects.

## Visual style

- Preserve the current typography, spacing, grid, colors, and component language of the project.
- Do not introduce new fonts, colors, effects, or visual systems unless explicitly requested.
- Search this library for an existing solution before creating a new effect.
- Adapt only the content, colors, timing, and parameters required by the task.
- Keep effects visually restrained, smooth, and production-ready.

## Library sections

- `Hero-экран` — large interactive, WebGL, cursor, and storytelling effects.
- `Текст` — typography and text animation effects.
- `Инструменты` — GSAP Core, Scroll, SVG, and UI tools.

## Workflow

1. Understand the requested interaction and target section.
2. Search `catalog.json` for the closest approved effect.
3. Inspect the effect source and dependencies.
4. Reuse the local implementation instead of recreating it from scratch.
5. Keep the implementation self-contained where possible.
6. Test desktop, mobile, touch, and keyboard interaction.
7. Respect `prefers-reduced-motion`.
8. Check that external dependencies load correctly.
9. Keep HTML, CSS, and JavaScript compact and maintainable.

## GSAP

- Use the existing GSAP setup already present in the project.
- Register only the plugins required by the chosen effect.
- Avoid loading duplicate GSAP or plugin instances.
- Prefer timeline-based animation for multi-step effects.
- Clean up timelines, listeners, ScrollTriggers, and observers when no longer needed.

## Constraints

- Do not publish, deploy, commit, delete, or overwrite approved effects without an explicit user request.
- Do not remove existing effects.
- Do not globally modify an approved effect for a single project; create a project-specific adaptation instead.
- Do not use iframe or CodePen when a native local version exists.
- Do not silently change the library structure.
- Preserve favorites, navigation, theme switching, and current responsive behavior.

## Before finishing

- Verify the chosen effect exists in the library.
- Verify dependencies and paths.
- Verify the effect works without console errors.
- Verify mobile behavior.
- Verify reduced-motion behavior.
- Summarize which library effect was used and what was adapted.
