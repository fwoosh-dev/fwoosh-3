import * as stylex from "@stylexjs/stylex";
import { borderRadius, space, text } from "../theme/theme.stylex.js";
import { gray } from "../theme/colors.stylex.js";

export interface InlineCodeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "style" | "className"> {
  style?: stylex.StyleXStyles;
}

const styles = stylex.create({
  base: {
    display: "inline-flex",
    fontSize: text.sm,
    padding: `${space[2]} ${space[3]}`,
    background: gray.hover,
    color: gray.subtleText,
    borderRadius: borderRadius.sm,
  },
});

export function InlineCode({ style, ...props }: InlineCodeProps) {
  return <span {...props} {...stylex.props(styles.base, style)} />;
}
