"use client";

import {
  Modal,
  ModalOverlay,
  Dialog as DialogPrimitive,
  DialogProps as DialogPrimitiveProps,
  ModalOverlayProps,
} from "react-aria-components";
import { Popover, PopoverProps } from "./Popover.js";
import * as stylex from "@stylexjs/stylex";
import {
  appChrome,
  appChromeA,
  borderRadius,
  focusRing,
  space,
} from "../theme/tokens.stylex.js";
import { mergeProps, useFocusRing } from "react-aria";
import { Scroller } from "./Scroller.js";

const styles = stylex.create({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: space[4],
    outline: {
      ":focus-visible": "none",
      ":focus": "none",
    },
    padding: `${space[4]} ${space[5]}`,
    position: "relative",
  },
  focused: {
    "::before": {
      borderColor: focusRing.color,
      borderRadius: borderRadius.md,
      borderStyle: "solid",
      borderWidth: focusRing.width,
      content: "''",
      inset: -6,
      position: "absolute",
      zIndex: -1,
    },
  },
  popover: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 300,
  },
  popoverHeight: (height) => ({ height }),
  scroller: {
    flexGrow: 1,
    minHeight: 0,
  },
  overlay: {
    backgroundColor: appChromeA.solid,
    inset: 0,
    padding: `${space[4]} ${space[5]}`,
    position: "fixed",
  },
  modal: {
    backgroundColor: appChrome.appBg,
    borderColor: appChromeA.subtleBorder,
    borderRadius: borderRadius.md,
    borderStyle: "solid",
    borderWidth: 1,
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 2px 4px 0px",
    display: "flex",
    flexDirection: "column",
    gap: space[4],
    margin: "33vh auto 0",
    width: "100%",
  },
  smallModal: {
    maxWidth: 300,
  },
  mediumModal: {
    maxWidth: 500,
  },
  largeModal: {
    maxWidth: 700,
  },
});

export interface DialogProps
  extends Omit<DialogPrimitiveProps, "style" | "className"> {
  style?: stylex.StyleXStyles;
}

export function Dialog({ style, ...props }: DialogProps) {
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <DialogPrimitive
      {...mergeProps(
        props,
        focusProps,
        stylex.props(styles.base, isFocusVisible && styles.focused, style)
      )}
    />
  );
}

export interface DialogPopoverProps extends Omit<PopoverProps, "children"> {
  children: React.ReactNode;
}

export function DialogPopover({
  style,
  children,
  ...props
}: DialogPopoverProps) {
  return (
    <Popover {...mergeProps(props, { style: styles.popover })}>
      <Scroller setHeightOnMount={true} style={styles.scroller}>
        {children}
      </Scroller>
    </Popover>
  );
}

export type DialogModalProps = ModalOverlayProps &
  React.RefAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    size?: "small" | "medium" | "large";
  };

export function DialogModal({
  style,
  children,
  size = "medium",
  ...props
}: DialogModalProps) {
  return (
    <ModalOverlay {...stylex.props(styles.overlay)} isDismissable={true}>
      <Modal
        {...mergeProps(
          props,
          stylex.props(
            styles.modal,
            size === "small" && styles.smallModal,
            size === "medium" && styles.mediumModal,
            size === "large" && styles.largeModal
          ),
          {
            className: "inter",
          }
        )}
      >
        <Scroller setHeightOnMount={true} style={styles.scroller}>
          {children}
        </Scroller>
      </Modal>
    </ModalOverlay>
  );
}

export { DialogTrigger, Heading } from "react-aria-components";
