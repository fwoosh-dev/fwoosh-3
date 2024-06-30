"use client";

import {
  TextField as TextFieldPrimitive,
  TextFieldProps as TextFieldPrimitiveProps,
  Input as InputPrimitive,
  InputProps as InputPrimitiveProps,
} from "react-aria-components";
import * as stylex from "@stylexjs/stylex";
import { appChrome, borderRadius, space } from "../theme/tokens.stylex.js";
import { mergeProps, useFocusRing } from "react-aria";
import { FocusRing } from "./FocusRing.js";

const styles = stylex.create({
  inputWrapper: {
    position: "relative",
    width: "100%",
  },
  input: {
    backgroundColor: {
      default: appChrome.elementBg,
      ":focus-visible": appChrome.subtleBg,
      ":hover": appChrome.hover,
    },
    borderColor: {
      default: appChrome.subtleBorder,
      ":focus-visible": appChrome.elementBorder,
      ":hover": appChrome.hoveredBorder,
    },
    borderRadius: borderRadius.md,
    borderStyle: "solid",
    borderWidth: 1,
    color: {
      default: appChrome.subtleText,
      ":focus": appChrome.text,
    },
    height: space[7],
    outline: {
      ":focus-visible": "none",
      ":focus": "none",
    },
    padding: `0 ${space[4]}`,
    width: "100%",
  },
  focusRing: {
    borderRadius: borderRadius.md,
  },
  field: {
    alignItems: "center",
    display: "flex",
    gap: space[4],
  },
});

export function Input({ children, ...props }: InputPrimitiveProps) {
  const { isFocused, focusProps } = useFocusRing({
    isTextInput: true,
  });

  return (
    <div {...stylex.props(styles.inputWrapper)}>
      {isFocused && <FocusRing style={styles.focusRing} />}
      <InputPrimitive
        {...mergeProps(props, focusProps, stylex.props(styles.input))}
      />
    </div>
  );
}

type TextFieldProps = Omit<
  TextFieldPrimitiveProps,
  "children" | "style" | "className"
> & {
  children: React.ReactNode;
  style?: stylex.StyleXStyles;
};

export function TextField({ children, style, ...props }: TextFieldProps) {
  return (
    <TextFieldPrimitive {...props} {...stylex.props(styles.field, style)}>
      {children}
    </TextFieldPrimitive>
  );
}
