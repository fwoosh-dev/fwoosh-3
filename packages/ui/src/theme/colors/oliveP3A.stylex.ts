import * as stylex from "@stylexjs/stylex";

/**
 * Each step was designed for at least one specific use case.
 */
export const oliveP3A = stylex.defineVars({
  /** 
   * Step 1: App background
   * Steps `appBg` and `subtleBg\' are designed for app backgrounds and subtle component backgrounds.
   */
  appBg: "color(display-p3 0.024 0.349 0.024 / 0.012)",
  /**
   * Step 2: Subtle background
   * Steps `appBg` and `subtleBg\' are designed for app backgrounds and subtle component backgrounds.
   */ 
  subtleBg: "color(display-p3 0.024 0.302 0.024 / 0.028)",
  /**
   * Step 3: UI element background
   * Steps `elementBg`, `hover`, and `active` are designed for UI component backgrounds.
   */ 
  elementBg: "color(display-p3 0.008 0.129 0.008 / 0.063)",
  /**
   * Step 4: Hovered UI element background
   * Steps `elementBg`, `hover`, and `active` are designed for UI component backgrounds.
   */
  hover: "color(display-p3 0.012 0.094 0.012 / 0.095)",
  /**
   * Step 5: Active / Selected UI element background
   * Steps `elementBg`, `hover`, and `active` are designed for UI component backgrounds.
   */
  active: "color(display-p3 0.035 0.098 0.008 / 0.126)",
  /** 
   * Step 6: Subtle borders and separators
   * Designed for subtle borders on components which are not interactive. For example sidebars, headers, cards, alerts, and separators.
   */
  subtleBorder: "color(display-p3 0.027 0.078 0.004 / 0.157)",
  /**
   * Step 7: UI element border and focus rings
   * Designed for subtle borders on interactive components.
   */ 
  elementBorder: "color(display-p3 0.02 0.059 0 / 0.2)",
  /** 
   * Step 8: Hovered UI element border
   * Designed for stronger borders on interactive components and focus rings.
   */ 
  hoveredBorder: "color(display-p3 0.02 0.059 0.004 / 0.279)",
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
  solid: "color(display-p3 0.02 0.051 0.004 / 0.467)",
  /**
   * Step 10: Hovered solid backgrounds
   * Designed for component hover states, where step `solid` is the component's normal state background.
   */ 
  hoveredSolid: "color(display-p3 0.024 0.047 0 / 0.51)",
  /**
   * Step 11: Low-contrast text
   * Designed for low-contrast text.
   */ 
  subtleText: "color(display-p3 0.012 0.039 0 / 0.628)",
  /**
   * Step 12: High-contrast text
   * Designed for high-contrast text.
   */ 
  text: "color(display-p3 0.008 0.024 0 / 0.891)",
});