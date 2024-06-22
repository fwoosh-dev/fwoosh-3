import * as stylex from "@stylexjs/stylex";

/**
 * Each step was designed for at least one specific use case.
 */
export const amberDarkP3 = stylex.defineVars({
  /**
   * Step 1: App background
   * Steps `appBg` and `subtleBg\' are designed for app backgrounds and subtle component backgrounds.
   */
  appBg: "color(display-p3 0.082 0.07 0.05)",
  /**
   * Step 2: Subtle background
   * Steps `appBg` and `subtleBg\' are designed for app backgrounds and subtle component backgrounds.
   */
  subtleBg: "color(display-p3 0.111 0.094 0.064)",
  /**
   * Step 3: UI element background
   * Steps `elementBg`, `hover`, and `active` are designed for UI component backgrounds.
   */
  elementBg: "color(display-p3 0.178 0.128 0.049)",
  /**
   * Step 4: Hovered UI element background
   * Steps `elementBg`, `hover`, and `active` are designed for UI component backgrounds.
   */
  hover: "color(display-p3 0.239 0.156 0)",
  /**
   * Step 5: Active / Selected UI element background
   * Steps `elementBg`, `hover`, and `active` are designed for UI component backgrounds.
   */
  active: "color(display-p3 0.29 0.193 0)",
  /**
   * Step 6: Subtle borders and separators
   * Designed for subtle borders on components which are not interactive. For example sidebars, headers, cards, alerts, and separators.
   */
  subtleBorder: "color(display-p3 0.344 0.245 0.076)",
  /**
   * Step 7: UI element border and focus rings
   * Designed for subtle borders on interactive components.
   */
  elementBorder: "color(display-p3 0.422 0.314 0.141)",
  /**
   * Step 8: Hovered UI element border
   * Designed for stronger borders on interactive components and focus rings.
   */
  hoveredBorder: "color(display-p3 0.535 0.399 0.189)",
  /**
   * Step 9: Solid background
   * Has the highest chroma of all steps in the scale. In other words, it's the purest step, the step mixed with the least amount of white or black. Because `solid` is the purest step, it has a wide range of applications:
   *
   * - Website/App backgrounds
   * - Website section backgrounds
   * - Header backgrounds
   * - Component backgrounds
   * - Graphics/Logos
   * - Overlays
   * - Coloured shadows
   * - Accent borders
   */
  solid: "color(display-p3 1 0.77 0.26)",
  /**
   * Step 10: Hovered solid backgrounds
   * Designed for component hover states, where step `solid` is the component's normal state background.
   */
  hoveredSolid: "color(display-p3 1 0.87 0.15)",
  /**
   * Step 11: Low-contrast text
   * Designed for low-contrast text.
   */
  subtleText: "color(display-p3 1 0.8 0.29)",
  /**
   * Step 12: High-contrast text
   * Designed for high-contrast text.
   */
  text: "color(display-p3 0.984 0.909 0.726)",
});
