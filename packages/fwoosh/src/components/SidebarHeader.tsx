import { getConfig } from "@fwoosh/types";
import { Link } from "waku";
import * as stylex from "@stylexjs/stylex";
import { primary, space } from "@fwoosh/ui/tokens.stylex";

const styles = stylex.create({
  base: {
    display: "flex",
    justifyContent: "space-between",
    padding: space[5],
  },
  link: {
    color: {
      default: primary.subtleText,
    },
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
    textDecorationStyle: {
      ":hover": "wavy",
    },
  },
});

export async function SidebarHeader() {
  const config = await getConfig();

  return (
    <h2 {...stylex.props(styles.base)}>
      <Link to="/" {...stylex.props(styles.link)}>
        {config.name}
      </Link>
    </h2>
  );
}
