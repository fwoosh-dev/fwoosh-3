"use client";

import {
  ListBoxItemProps,
  SelectProps as SelectPropsPrimitive,
  ValidationResult,
  Button,
  FieldError,
  ListBox,
  ListBoxItem,
  Select as SelectPrimitive,
  SelectValue,
  Text,
} from "react-aria-components";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as stylex from "@stylexjs/stylex";

import { Label } from "./Label.js";
import { Popover } from "./Popover.js";
import {
  appChrome,
  borderRadius,
  focusRing,
  primary,
  space,
  text,
} from "../theme/tokens.stylex.js";
import { mergeProps } from "react-aria";
import { FocusRing } from "./FocusRing.js";
import { IconWrapper } from "./IconButton.js";

interface SelectVariant {
  variant?: "toolbar";
}

const triggerStyles = stylex.create({
  trigger: {
    alignItems: "center",
    display: "flex",

    backgroundColor: {
      default: appChrome.elementBg,
      ":is([aria-expanded=true])": appChrome.subtleBg,
      ":hover": appChrome.hover,
    },
    borderColor: {
      default: appChrome.subtleBorder,
      ":hover": appChrome.hoveredBorder,
    },
    borderRadius: borderRadius.md,
    borderStyle: "solid",
    borderWidth: 1,
    color: appChrome.subtleText,
    gap: space[4],
    height: space[7],
    outline: {
      ":focus-visible": "none",
    },
    paddingLeft: space[4],
    paddingRight: space[2],
    position: "relative",
    textTransform: "capitalize",
  },
  triggerToolbar: {
    backgroundColor: {
      default: appChrome.subtleBg,
      ":is([aria-expanded=true])": appChrome.appBg,
      ":hover": appChrome.elementBg,
    },
    borderRadius: borderRadius.sm,
    gap: space[2],
    height: space[6],
  },
  triggerFocus: {
    backgroundColor: appChrome.subtleBg,
    borderColor: appChrome.elementBorder,
  },
  focusRing: {
    borderRadius: borderRadius.md,
  },
  label: {
    flexGrow: 1,
    textAlign: "left",
  },
});

function SelectTrigger({ variant }: SelectVariant) {
  return (
    <Button
      className={({ isFocusVisible }) => {
        const { className = "" } = stylex.props(
          triggerStyles.trigger,
          isFocusVisible && triggerStyles.triggerFocus,
          variant === "toolbar" && triggerStyles.triggerToolbar
        );

        return className;
      }}
    >
      {({ isFocusVisible }) => {
        return (
          <>
            {isFocusVisible && <FocusRing style={triggerStyles.focusRing} />}
            <SelectValue {...stylex.props(triggerStyles.label)} />
            <IconWrapper variant="toolbar">
              <ChevronDownIcon />
            </IconWrapper>
          </>
        );
      }}
    </Button>
  );
}

const selectStyles = stylex.create({
  select: {
    alignItems: "center",
    display: "flex",
    gap: space[4],
  },
  popover: {
    minWidth: "max-content",
    overflow: "auto",
    width: "var(--trigger-width)",
  },
});

interface SelectProps<T extends object>
  extends Omit<SelectPropsPrimitive<T>, "children" | "style" | "className">,
    SelectVariant {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
  style?: stylex.StyleXStyles;
}

export function Select<T extends object>({
  label,
  description,
  errorMessage,
  children,
  items,
  style,
  variant,
  ...props
}: SelectProps<T>) {
  return (
    <SelectPrimitive
      {...mergeProps(props, stylex.props(selectStyles.select, style))}
    >
      {label && <Label>{label}</Label>}
      <SelectTrigger variant={variant} />
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      <Popover {...stylex.props(selectStyles.popover)}>
        <ListBox items={items}>{children}</ListBox>
      </Popover>
    </SelectPrimitive>
  );
}

const optionStyles = stylex.create({
  option: {
    alignItems: "center",
    color: appChrome.subtleText,
    cursor: "default",
    display: "flex",
    fontSize: text.xs,
    height: space[7],
    outline: {
      default: "none",
      ":focus-visible": "none",
    },
    padding: `${space[2]} ${space[4]}`,
    position: "relative",
    textTransform: "capitalize",
    zIndex: 0,

    "::before": {
      backgroundColor: appChrome.elementBg,
      borderRadius: borderRadius.mdInset,
      content: "''",
      inset: space[2],
      opacity: 0,
      position: "absolute",
      transition: "opacity 0.1s",
      zIndex: -1,
    },
  },
  hovered: {
    "::before": {
      opacity: 1,
    },
  },
  selected: {
    "::before": {
      backgroundColor: primary.elementBg,
      color: appChrome.text,
      opacity: 1,
    },
  },
  selectedHovered: {
    "::before": {
      backgroundColor: primary.hover,
    },
  },
  focusRing: {
    borderRadius: borderRadius.md,
    boxShadow: `0 0 0 2px ${focusRing.color}`,
  },
});

export function SelectOption(props: ListBoxItemProps) {
  return (
    <ListBoxItem
      {...props}
      className={({ isHovered, isSelected, isFocusVisible }) => {
        const { className = "" } = stylex.props(
          optionStyles.option,
          isHovered && optionStyles.hovered,
          isSelected && optionStyles.selected,
          isSelected && isHovered && optionStyles.selectedHovered,
          isFocusVisible && optionStyles.focusRing
        );

        return `inter ${className}`;
      }}
    />
  );
}
