import { FwooshPluginProps } from "@fwoosh/types";
import { CenteredDecoratorOptions } from "./types.js";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  wrapper: {
    alignItems: "center",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    overflow: "auto",
    width: "100%",
  },
});

export default function CenteredDecorator({
  options,
  children,
}: FwooshPluginProps<CenteredDecoratorOptions> & {
  children: React.ReactNode;
}) {
  if (!options?.enabled) {
    return <>{children}</>;
  }

  return <div {...stylex.props(styles.wrapper)}>{children}</div>;
}
