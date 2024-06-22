import * as stylex from "@stylexjs/stylex";
import { mauve } from "./colors/mauve.stylex.js";
import { mauveA } from "./colors/mauveA.stylex.js";
import { pink } from "./colors/pink.stylex.js";
import { pinkA } from "./colors/pinkA.stylex.js";
import { mauveDark } from "./colors/mauveDark.stylex.js";
import { mauveDarkA } from "./colors/mauveDarkA.stylex.js";
import { pinkDark } from "./colors/pinkDark.stylex.js";
import { pinkDarkA } from "./colors/pinkDarkA.stylex.js";
import { blue } from "./colors/blue.stylex.js";

export const appChrome = stylex.defineVars({
  appBg: mauve.appBg,
  subtleBg: mauve.subtleBg,
  elementBg: mauve.elementBg,
  hover: mauve.hover,
  active: mauve.active,
  subtleBorder: mauve.subtleBorder,
  elementBorder: mauve.elementBorder,
  hoveredBorder: mauve.hoveredBorder,
  solid: mauve.solid,
  hoveredSolid: mauve.hoveredSolid,
  subtleText: mauve.subtleText,
  text: mauve.text,
});
export const appChromeA = stylex.defineVars({
  appBg: mauveA.appBg,
  subtleBg: mauveA.subtleBg,
  elementBg: mauveA.elementBg,
  hover: mauveA.hover,
  active: mauveA.active,
  subtleBorder: mauveA.subtleBorder,
  elementBorder: mauveA.elementBorder,
  hoveredBorder: mauveA.hoveredBorder,
  solid: mauveA.solid,
  hoveredSolid: mauveA.hoveredSolid,
  subtleText: mauveA.subtleText,
  text: mauveA.text,
});
export const primary = stylex.defineVars({
  appBg: pink.appBg,
  subtleBg: pink.subtleBg,
  elementBg: pink.elementBg,
  hover: pink.hover,
  active: pink.active,
  subtleBorder: pink.subtleBorder,
  elementBorder: pink.elementBorder,
  hoveredBorder: pink.hoveredBorder,
  solid: pink.solid,
  hoveredSolid: pink.hoveredSolid,
  subtleText: pink.subtleText,
  text: pink.text,
});
export const primaryA = stylex.defineVars({
  appBg: pinkA.appBg,
  subtleBg: pinkA.subtleBg,
  elementBg: pinkA.elementBg,
  hover: pinkA.hover,
  active: pinkA.active,
  subtleBorder: pinkA.subtleBorder,
  elementBorder: pinkA.elementBorder,
  hoveredBorder: pinkA.hoveredBorder,
  solid: pinkA.solid,
  hoveredSolid: pinkA.hoveredSolid,
  subtleText: pinkA.subtleText,
  text: pinkA.text,
});

export const appChromeDark = stylex.defineVars({
  appBg: mauveDark.appBg,
  subtleBg: mauveDark.subtleBg,
  elementBg: mauveDark.elementBg,
  hover: mauveDark.hover,
  active: mauveDark.active,
  subtleBorder: mauveDark.subtleBorder,
  elementBorder: mauveDark.elementBorder,
  hoveredBorder: mauveDark.hoveredBorder,
  solid: mauveDark.solid,
  hoveredSolid: mauveDark.hoveredSolid,
  subtleText: mauveDark.subtleText,
  text: mauveDark.text,
});
export const appChromeDarkA = stylex.defineVars({
  appBg: mauveDarkA.appBg,
  subtleBg: mauveDarkA.subtleBg,
  elementBg: mauveDarkA.elementBg,
  hover: mauveDarkA.hover,
  active: mauveDarkA.active,
  subtleBorder: mauveDarkA.subtleBorder,
  elementBorder: mauveDarkA.elementBorder,
  hoveredBorder: mauveDarkA.hoveredBorder,
  solid: mauveDarkA.solid,
  hoveredSolid: mauveDarkA.hoveredSolid,
  subtleText: mauveDarkA.subtleText,
  text: mauveDarkA.text,
});
export const primaryDark = stylex.defineVars({
  appBg: pinkDark.appBg,
  subtleBg: pinkDark.subtleBg,
  elementBg: pinkDark.elementBg,
  hover: pinkDark.hover,
  active: pinkDark.active,
  subtleBorder: pinkDark.subtleBorder,
  elementBorder: pinkDark.elementBorder,
  hoveredBorder: pinkDark.hoveredBorder,
  solid: pinkDark.solid,
  hoveredSolid: pinkDark.hoveredSolid,
  subtleText: pinkDark.subtleText,
  text: pinkDark.text,
});
export const primaryDarkA = stylex.defineVars({
  appBg: pinkDarkA.appBg,
  subtleBg: pinkDarkA.subtleBg,
  elementBg: pinkDarkA.elementBg,
  hover: pinkDarkA.hover,
  active: pinkDarkA.active,
  subtleBorder: pinkDarkA.subtleBorder,
  elementBorder: pinkDarkA.elementBorder,
  hoveredBorder: pinkDarkA.hoveredBorder,
  solid: pinkDarkA.solid,
  hoveredSolid: pinkDarkA.hoveredSolid,
  subtleText: pinkDarkA.subtleText,
  text: pinkDarkA.text,
});

export const focusRing = stylex.defineVars({
  color: blue.hoveredBorder,
});

export const borderRadius = stylex.defineVars({
  sm: "4px",
  mdInset: "6px",
  md: "8px",
  lg: "16px",
  round: "9999px",
});

export const space = stylex.defineVars({
  1: "1px",
  2: "2px",
  3: "4px",
  4: "8px",
  5: "16px",
  6: "24px",
  7: "32px",
  8: "40px",
});

export const text = stylex.defineVars({
  xs: "0.75rem",
  sm: "0.85rem",
  base: "1rem",
  lg: "1.125rem",
});

export const fontWeight = stylex.defineVars({
  thin: "100",
  extraLight: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  heavy: "800",
  extraHeavy: "900",
});
