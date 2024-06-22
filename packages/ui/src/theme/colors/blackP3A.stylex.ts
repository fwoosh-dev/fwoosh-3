import * as stylex from "@stylexjs/stylex";

/**
 * Each step was designed for at least one specific use case.
 */
export const blackP3A = stylex.defineVars({
  /** 
   * Step 1: App background
   * Steps `appBg` and `subtleBg\' are designed for app backgrounds and subtle component backgrounds.
   */
  appBg: "color(display-p3 0 0 0 / 0.05)",
  /**
   * Step 2: Subtle background
   * Steps `appBg` and `subtleBg\' are designed for app backgrounds and subtle component backgrounds.
   */ 
  subtleBg: "color(display-p3 0 0 0 / 0.1)",
  /**
   * Step 3: UI element background
   * Steps `elementBg`, `hover`, and `active` are designed for UI component backgrounds.
   */ 
  elementBg: "color(display-p3 0 0 0 / 0.15)",
  /**
   * Step 4: Hovered UI element background
   * Steps `elementBg`, `hover`, and `active` are designed for UI component backgrounds.
   */
  hover: "color(display-p3 0 0 0 / 0.2)",
  /**
   * Step 5: Active / Selected UI element background
   * Steps `elementBg`, `hover`, and `active` are designed for UI component backgrounds.
   */
  active: "color(display-p3 0 0 0 / 0.3)",
  /** 
   * Step 6: Subtle borders and separators
   * Designed for subtle borders on components which are not interactive. For example sidebars, headers, cards, alerts, and separators.
   */
  subtleBorder: "color(display-p3 0 0 0 / 0.4)",
  /**
   * Step 7: UI element border and focus rings
   * Designed for subtle borders on interactive components.
   */ 
  elementBorder: "color(display-p3 0 0 0 / 0.5)",
  /** 
   * Step 8: Hovered UI element border
   * Designed for stronger borders on interactive components and focus rings.
   */ 
  hoveredBorder: "color(display-p3 0 0 0 / 0.6)",
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
  solid: "color(display-p3 0 0 0 / 0.7)",
  /**
   * Step 10: Hovered solid backgrounds
   * Designed for component hover states, where step `solid` is the component's normal state background.
   */ 
  hoveredSolid: "color(display-p3 0 0 0 / 0.8)",
  /**
   * Step 11: Low-contrast text
   * Designed for low-contrast text.
   */ 
  subtleText: "color(display-p3 0 0 0 / 0.9)",
  /**
   * Step 12: High-contrast text
   * Designed for high-contrast text.
   */ 
  text: "color(display-p3 0 0 0 / 0.95)",
});