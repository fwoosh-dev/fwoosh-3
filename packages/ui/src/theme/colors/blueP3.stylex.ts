import * as stylex from "@stylexjs/stylex";

/**
 * Each step was designed for at least one specific use case.
 */
export const blueP3 = stylex.defineVars({
  /**
   * Step 1: App background
   * Steps `appBg` and `subtleBg\' are designed for app backgrounds and subtle component backgrounds.
   */
  appBg: "color(display-p3 0.986 0.992 0.999)",
  /**
   * Step 2: Subtle background
   * Steps `appBg` and `subtleBg\' are designed for app backgrounds and subtle component backgrounds.
   */
  subtleBg: "color(display-p3 0.96 0.979 0.998)",
  /**
   * Step 3: UI element background
   * Steps `elementBg`, `hover`, and `active` are designed for UI component backgrounds.
   */
  elementBg: "color(display-p3 0.912 0.956 0.991)",
  /**
   * Step 4: Hovered UI element background
   * Steps `elementBg`, `hover`, and `active` are designed for UI component backgrounds.
   */
  hover: "color(display-p3 0.853 0.932 1)",
  /**
   * Step 5: Active / Selected UI element background
   * Steps `elementBg`, `hover`, and `active` are designed for UI component backgrounds.
   */
  active: "color(display-p3 0.788 0.894 0.998)",
  /**
   * Step 6: Subtle borders and separators
   * Designed for subtle borders on components which are not interactive. For example sidebars, headers, cards, alerts, and separators.
   */
  subtleBorder: "color(display-p3 0.709 0.843 0.976)",
  /**
   * Step 7: UI element border and focus rings
   * Designed for subtle borders on interactive components.
   */
  elementBorder: "color(display-p3 0.606 0.777 0.947)",
  /**
   * Step 8: Hovered UI element border
   * Designed for stronger borders on interactive components and focus rings.
   */
  hoveredBorder: "color(display-p3 0.451 0.688 0.917)",
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
  solid: "color(display-p3 0.247 0.556 0.969)",
  /**
   * Step 10: Hovered solid backgrounds
   * Designed for component hover states, where step `solid` is the component's normal state background.
   */
  hoveredSolid: "color(display-p3 0.234 0.523 0.912)",
  /**
   * Step 11: Low-contrast text
   * Designed for low-contrast text.
   */
  subtleText: "color(display-p3 0.15 0.44 0.84)",
  /**
   * Step 12: High-contrast text
   * Designed for high-contrast text.
   */
  text: "color(display-p3 0.102 0.193 0.379)",
});
