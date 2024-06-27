import { getConfig } from "@fwoosh/types";
import { Link } from "waku";
import * as stylex from "@stylexjs/stylex";
import { primary, space } from "@fwoosh/ui/tokens.stylex";
import path from "path";

const styles = stylex.create({
  base: {
    display: "flex",
    justifyContent: "space-between",
  },
  link: {
    color: {
      default: primary.subtleText,
    },
    padding: space[5],
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
    textDecorationStyle: {
      ":hover": "wavy",
    },
  },
  logo: {
    maxHeight: 80,
    width: "100%",
  },
});

export async function SidebarHeader() {
  const config = await getConfig();
  const logo = config.logo ? path.basename(config.logo) : null;

  return (
    <h2 {...stylex.props(styles.base)}>
      {logo ? (
        <Link to="/">
          <img
            src={`/${logo}`}
            alt={`${config.name} components`}
            {...stylex.props(styles.logo)}
          />
        </Link>
      ) : (
        <Link to="/" {...stylex.props(styles.link)}>
          {config.name}
        </Link>
      )}
    </h2>
  );
}
