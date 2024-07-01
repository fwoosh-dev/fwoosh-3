import {
  NumberFieldProps as NumberFieldPropsPrimitive,
  ValidationResult,
  NumberField as NumberFieldPrimitive,
  Group,
  Input,
  FieldError,
  Text,
} from "react-aria-components";
import * as stylex from "@stylexjs/stylex";

import { Label } from "./Label.js";
import { mergeProps, useFocusRing } from "react-aria";
import { IconButton } from "./IconButton.js";
import { appChrome, borderRadius, space } from "../theme/tokens.stylex.js";
import { FocusRing } from "./FocusRing.js";

const styles = stylex.create({
  group: {
    alignItems: "center",
    display: "flex",
    position: "relative",

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
    height: space[7],
    padding: space[2],
  },
  input: {
    background: "transparent",
    borderWidth: 0,
    color: {
      default: appChrome.subtleText,
      ":focus": appChrome.text,
    },
    flexGrow: 1,
    outline: {
      ":focus-visible": "none",
      ":focus": "none",
    },
  },
  focusRing: {
    borderRadius: borderRadius.md,
  },
  dimmedButton: {
    color: appChrome.subtleText,
  },
});

export interface NumberFieldProps
  extends Omit<NumberFieldPropsPrimitive, "className" | "style"> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  style?: stylex.StyleXStyles;
}

export function NumberField({
  label,
  description,
  errorMessage,
  style,
  ...props
}: NumberFieldProps) {
  const { isFocused, focusProps } = useFocusRing({
    isTextInput: true,
  });

  return (
    <NumberFieldPrimitive {...mergeProps(props, stylex.props(style))}>
      <Label>{label}</Label>
      <Group {...stylex.props(styles.group)}>
        {isFocused && <FocusRing style={styles.focusRing} />}
        <IconButton
          style={isFocused ? undefined : styles.dimmedButton}
          variant="toolbar"
          slot="decrement"
        >
          -
        </IconButton>
        <Input {...mergeProps(focusProps, stylex.props(styles.input))} />
        <IconButton
          style={isFocused ? undefined : styles.dimmedButton}
          variant="toolbar"
          slot="increment"
        >
          +
        </IconButton>
      </Group>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </NumberFieldPrimitive>
  );
}
