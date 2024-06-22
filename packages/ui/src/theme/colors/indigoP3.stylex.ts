import * as stylex from "@stylexjs/stylex";

/**
 * Each step was designed for at least one specific use case.
 */
export const indigoP3 = stylex.defineVars({
  /**
   * Step 1: App background
   * Steps `appBg` and `subtleBg\' are designed for app backgrounds and subtle component backgrounds.
   */
  appBg: "color(display-p3 0.992 0.992 0.996)",
  /**
   * Step 2: Subtle background
   * Steps `appBg` and `subtleBg\' are designed for app backgrounds and subtle component backgrounds.
   */
  subtleBg: "color(display-p3 0.971 0.977 0.998)",
  /**
   * Step 3: UI element background
   * Steps `elementBg`, `hover`, and `active` are designed for UI component backgrounds.
   */
  elementBg: "color(display-p3 0.933 0.948 0.992)",
  /**
   * Step 4: Hovered UI element background
   * Steps `elementBg`, `hover`, and `active` are designed for UI component backgrounds.
   */
  hover: "color(display-p3 0.885 0.914 1)",
  /**
   * Step 5: Active / Selected UI element background
   * Steps `elementBg`, `hover`, and `active` are designed for UI component backgrounds.
   */
  active: "color(display-p3 0.831 0.87 1)",
  /**
   * Step 6: Subtle borders and separators
   * Designed for subtle borders on components which are not interactive. For example sidebars, headers, cards, alerts, and separators.
   */
  subtleBorder: "color(display-p3 0.767 0.814 0.995)",
  /**
   * Step 7: UI element border and focus rings
   * Designed for subtle borders on interactive components.
   */
  elementBorder: "color(display-p3 0.685 0.74 0.957)",
  /**
   * Step 8: Hovered UI element border
   * Designed for stronger borders on interactive components and focus rings.
   */
  hoveredBorder: "color(display-p3 0.569 0.639 0.916)",
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
  solid: "color(display-p3 0.276 0.384 0.837)",
  /**
   * Step 10: Hovered solid backgrounds
   * Designed for component hover states, where step `solid` is the component's normal state background.
   */
  hoveredSolid: "color(display-p3 0.234 0.343 0.801)",
  /**
   * Step 11: Low-contrast text
   * Designed for low-contrast text.
   */
  subtleText: "color(display-p3 0.256 0.354 0.755)",
  /**
   * Step 12: High-contrast text
   * Designed for high-contrast text.
   */
  text: "color(display-p3 0.133 0.175 0.348)",
});
