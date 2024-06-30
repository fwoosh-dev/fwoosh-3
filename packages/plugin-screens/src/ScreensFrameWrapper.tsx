"use client";

import { appChrome, space } from "@fwoosh/ui/theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useValue } from "tinybase/ui-react";

import { sizes, ScreenSize } from "./sizes.js";
import { canUseOrientation, store } from "./store.js";

const styles = stylex.create({
  wrapper: {
    backgroundColor: appChrome.elementBg,
    minHeight: "100%",
    padding: space[5],
  },
  inner: {
    borderColor: appChrome.elementBorder,
    borderStyle: "solid",
    borderWidth: 2,
    margin: "auto",
    transform: "scale(var(--zoom))",
    transformOrigin: "top center",
  },
});

export default function ScreensFrameWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const deviceName = useValue("device", store);
  const orientation = useValue("orientation", store);

  if (!deviceName) {
    return <>{children}</>;
  }

  let device = sizes[deviceName as ScreenSize];

  if (!device) {
    return <>{children}</>;
  }

  if (orientation === "landscape" && canUseOrientation(deviceName)) {
    device = {
      height: device.width,
      width: device.height,
    };
  }

  return (
    <div
      {...stylex.props(styles.wrapper)}
      id="zoom-container"
      style={{
        height: `calc((${device.height}px * var(--zoom)) + (${space[5]} * 2))`,
      }}
    >
      <div
        {...stylex.props(styles.inner)}
        id="zoom-target"
        style={{
          aspectRatio: `${device.width} / ${device.height}`,
          height: device.height,
          width: device.width,
        }}
      >
        {children}
      </div>
    </div>
  );
}
