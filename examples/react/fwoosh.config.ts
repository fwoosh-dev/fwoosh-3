import { defineConfig } from "fwoosh";
import { zoomPlugin } from "@fwoosh/plugin-zoom";
import { descriptionPlugin } from "@fwoosh/plugin-description";
import { reactDocgen } from "@fwoosh/plugin-react-docgen";
import { sourcePanel } from "@fwoosh/plugin-source-panel";
import { repoLink } from "@fwoosh/plugin-repo-link";
import { centeredDecorator } from "@fwoosh/plugin-centered-decorator";

const config = defineConfig({
  name: "React Example",
  logo: "./images/logo.png",
  theme: {
    chrome: "mauve",
    primary: "crimson",
    code: {
      light: "catppuccin-latte",
      dark: "catppuccin-frappe",
    },
  },
  docgen: ["**/*.tsx"],
  plugins: [
    zoomPlugin(),
    descriptionPlugin(),
    reactDocgen(),
    sourcePanel(),
    repoLink({ repo: "fwoosh-dev/fwoosh-3" }),
    centeredDecorator(),
  ],
});

declare module "fwoosh" {
  type PageMeta = typeof config;
}

export default config;