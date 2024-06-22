import * as stylex from "@stylexjs/stylex";

/**
 * Each step was designed for at least one specific use case.
 */
export const ruby = stylex.defineVars({
  /** 
   * Step 1: App background
   * Steps `appBg` and `subtleBg\' are designed for app backgrounds and subtle component backgrounds.
   */
  appBg: "#fffcfd",
  /**
   * Step 2: Subtle background
   * Steps `appBg` and `subtleBg\' are designed for app backgrounds and subtle component backgrounds.
   */ 
  subtleBg: "#fff7f8",
  /**
   * Step 3: UI element background
   * Steps `elementBg`, `hover`, and `active` are designed for UI component backgrounds.
   */ 
  elementBg: "#feeaed",
  /**
   * Step 4: Hovered UI element background
   * Steps `elementBg`, `hover`, and `active` are designed for UI component backgrounds.
   */
  hover: "#ffdce1",
  /**
   * Step 5: Active / Selected UI element background
   * Steps `elementBg`, `hover`, and `active` are designed for UI component backgrounds.
   */
  active: "#ffced6",
  /** 
   * Step 6: Subtle borders and separators
   * Designed for subtle borders on components which are not interactive. For example sidebars, headers, cards, alerts, and separators.
   */
  subtleBorder: "#f8bfc8",
  /**
   * Step 7: UI element border and focus rings
   * Designed for subtle borders on interactive components.
   */ 
  elementBorder: "#efacb8",
  /** 
   * Step 8: Hovered UI element border
   * Designed for stronger borders on interactive components and focus rings.
   */ 
  hoveredBorder: "#e592a3",
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
  solid: "#e54666",
  /**
   * Step 10: Hovered solid backgrounds
   * Designed for component hover states, where step `solid` is the component's normal state background.
   */ 
  hoveredSolid: "#dc3b5d",
  /**
   * Step 11: Low-contrast text
   * Designed for low-contrast text.
   */ 
  subtleText: "#ca244d",
  /**
   * Step 12: High-contrast text
   * Designed for high-contrast text.
   */ 
  text: "#64172b",
});