import * as stylex from "@stylexjs/stylex";
import {
  appChrome,
  appChromeDark,
  appChromeA,
  appChromeDarkA,
  primary,
  primaryA,
  primaryDark,
  primaryDarkA,
} from "./colors.stylex.js";

const DARK = "@media (prefers-color-scheme: dark)";

export const appChromeTheme = stylex.createTheme(appChrome, {
  appBg: { default: appChrome.appBg, [DARK]: appChromeDark.appBg },
  subtleBg: { default: appChrome.subtleBg, [DARK]: appChromeDark.subtleBg },
  elementBg: { default: appChrome.elementBg, [DARK]: appChromeDark.elementBg },
  hover: { default: appChrome.hover, [DARK]: appChromeDark.hover },
  active: { default: appChrome.active, [DARK]: appChromeDark.active },
  subtleBorder: {
    default: appChrome.subtleBorder,
    [DARK]: appChromeDark.subtleBorder,
  },
  elementBorder: {
    default: appChrome.elementBorder,
    [DARK]: appChromeDark.elementBorder,
  },
  hoveredBorder: {
    default: appChrome.hoveredBorder,
    [DARK]: appChromeDark.hoveredBorder,
  },
  solid: { default: appChrome.solid, [DARK]: appChromeDark.solid },
  hoveredSolid: {
    default: appChrome.hoveredSolid,
    [DARK]: appChromeDark.hoveredSolid,
  },
  subtleText: {
    default: appChrome.subtleText,
    [DARK]: appChromeDark.subtleText,
  },
  text: { default: appChrome.text, [DARK]: appChromeDark.text },
});

export const appChromeATheme = stylex.createTheme(appChromeA, {
  appBg: { default: appChromeA.appBg, [DARK]: appChromeDarkA.appBg },
  subtleBg: { default: appChromeA.subtleBg, [DARK]: appChromeDarkA.subtleBg },
  elementBg: {
    default: appChromeA.elementBg,
    [DARK]: appChromeDarkA.elementBg,
  },
  hover: { default: appChromeA.hover, [DARK]: appChromeDarkA.hover },
  active: { default: appChromeA.active, [DARK]: appChromeDarkA.active },
  subtleBorder: {
    default: appChromeA.subtleBorder,
    [DARK]: appChromeDarkA.subtleBorder,
  },
  elementBorder: {
    default: appChromeA.elementBorder,
    [DARK]: appChromeDarkA.elementBorder,
  },
  hoveredBorder: {
    default: appChromeA.hoveredBorder,
    [DARK]: appChromeDarkA.hoveredBorder,
  },
  solid: { default: appChromeA.solid, [DARK]: appChromeDarkA.solid },
  hoveredSolid: {
    default: appChromeA.hoveredSolid,
    [DARK]: appChromeDarkA.hoveredSolid,
  },
  subtleText: {
    default: appChromeA.subtleText,
    [DARK]: appChromeDarkA.subtleText,
  },
  text: { default: appChromeA.text, [DARK]: appChromeDarkA.text },
});

export const primaryTheme = stylex.createTheme(primary, {
  appBg: { default: primary.appBg, [DARK]: primaryDark.appBg },
  subtleBg: { default: primary.subtleBg, [DARK]: primaryDark.subtleBg },
  elementBg: { default: primary.elementBg, [DARK]: primaryDark.elementBg },
  hover: { default: primary.hover, [DARK]: primaryDark.hover },
  active: { default: primary.active, [DARK]: primaryDark.active },
  subtleBorder: {
    default: primary.subtleBorder,
    [DARK]: primaryDark.subtleBorder,
  },
  elementBorder: {
    default: primary.elementBorder,
    [DARK]: primaryDark.elementBorder,
  },
  hoveredBorder: {
    default: primary.hoveredBorder,
    [DARK]: primaryDark.hoveredBorder,
  },
  solid: { default: primary.solid, [DARK]: primaryDark.solid },
  hoveredSolid: {
    default: primary.hoveredSolid,
    [DARK]: primaryDark.hoveredSolid,
  },
  subtleText: {
    default: primary.subtleText,
    [DARK]: primaryDark.subtleText,
  },
  text: { default: primary.text, [DARK]: primaryDark.text },
});

export const primaryATheme = stylex.createTheme(primaryA, {
  appBg: { default: primaryA.appBg, [DARK]: primaryDarkA.appBg },
  subtleBg: { default: primaryA.subtleBg, [DARK]: primaryDarkA.subtleBg },
  elementBg: { default: primaryA.elementBg, [DARK]: primaryDarkA.elementBg },
  hover: { default: primaryA.hover, [DARK]: primaryDarkA.hover },
  active: { default: primaryA.active, [DARK]: primaryDarkA.active },
  subtleBorder: {
    default: primaryA.subtleBorder,
    [DARK]: primaryDarkA.subtleBorder,
  },
  elementBorder: {
    default: primaryA.elementBorder,
    [DARK]: primaryDarkA.elementBorder,
  },
  hoveredBorder: {
    default: primaryA.hoveredBorder,
    [DARK]: primaryDarkA.hoveredBorder,
  },
  solid: { default: primaryA.solid, [DARK]: primaryDarkA.solid },
  hoveredSolid: {
    default: primaryA.hoveredSolid,
    [DARK]: primaryDarkA.hoveredSolid,
  },
  subtleText: {
    default: primaryA.subtleText,
    [DARK]: primaryDarkA.subtleText,
  },
  text: { default: primaryA.text, [DARK]: primaryDarkA.text },
});
