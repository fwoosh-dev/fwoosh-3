"use client";

import {
  TextField as TextFieldPrimitive,
  TextFieldProps as TextFieldPrimitiveProps,
  Input as InputPrimitive,
  InputProps as InputPrimitiveProps,
  TextArea as TextAreaPrimitive,
  TextAreaProps as TextAreaPrimitiveProps,
} from "react-aria-components";
import * as stylex from "@stylexjs/stylex";
import { appChrome, borderRadius, space } from "../theme/tokens.stylex.js";
import { mergeProps, useFocusRing } from "react-aria";
import { FocusRing } from "./FocusRing.js";

const styles = stylex.create({
  inputWrapper: {
    display: "flex",
    flexGrow: 1,
    minHeight: space[7],
    minWidth: 0,
    position: "relative",
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
    borderRadius: {
      default: borderRadius.md,
      ":focus": borderRadius.mdInset,
    },
    borderStyle: "solid",
    borderWidth: 1,
    boxSizing: "border-box",
    color: {
      default: appChrome.subtleText,
      ":focus": appChrome.text,
    },
    outline: {
      ":focus-visible": "none",
      ":focus": "none",
    },
    padding: `0 ${space[4]}`,
    width: "100%",
  },
  defaultInput: {
    height: space[7],
  },
  area: {
    boxSizing: "border-box",
    paddingBottom: space[3],
    paddingTop: 6,
  },
  horizontalField: {
    alignItems: "center",
    display: "flex",
    gap: space[4],
  },
  verticalField: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    gap: space[4],
  },
});

export function Input({ children, ...props }: InputPrimitiveProps) {
  const { isFocused, focusProps } = useFocusRing({
    isTextInput: true,
  });

  return (
    <div {...stylex.props(styles.inputWrapper)}>
      {isFocused && <FocusRing />}
      <InputPrimitive
        {...mergeProps(
          props,
          focusProps,
          stylex.props(styles.input, styles.defaultInput)
        )}
      />
    </div>
  );
}

export function TextArea({ children, ...props }: TextAreaPrimitiveProps) {
  const { isFocused, focusProps } = useFocusRing({
    isTextInput: true,
  });

  return (
    <div {...stylex.props(styles.inputWrapper)}>
      {isFocused && <FocusRing />}
      <TextAreaPrimitive
        {...mergeProps(
          props,
          focusProps,
          stylex.props(styles.input, styles.area)
        )}
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
  orientation?: "horizontal" | "vertical";
};

export function TextField({
  children,
  style,
  orientation = "horizontal",
  ...props
}: TextFieldProps) {
  return (
    <TextFieldPrimitive
      {...props}
      {...stylex.props(
        style,
        orientation === "vertical"
          ? styles.verticalField
          : styles.horizontalField
      )}
    >
      {children}
    </TextFieldPrimitive>
  );
}
