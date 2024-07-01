import { defineConfig } from "fwoosh";
import { zoomPlugin } from "@fwoosh/plugin-zoom";
import { descriptionPlugin } from "@fwoosh/plugin-description";
import { reactDocgen } from "@fwoosh/plugin-react-docgen";
import { sourcePanel } from "@fwoosh/plugin-source-panel";
import { repoLink } from "@fwoosh/plugin-repo-link";
import { centeredDecorator } from "@fwoosh/plugin-centered-decorator";
import { controlPanel } from "@fwoosh/plugin-control-panel";
import { screens } from "@fwoosh/plugin-screens";
import { a11y } from "@fwoosh/plugin-a11y";

const config = defineConfig({
  name: "React Example",
  logo: "./images/logo.png",
  theme: {
    chrome: "sage",
    primary: "jade",
    code: {
      light: "catppuccin-latte",
      dark: "catppuccin-frappe",
    },
  },
  docgen: ["**/*.tsx"],
  plugins: [
    // zoomPlugin(),
    descriptionPlugin(),
    // reactDocgen(),
    // sourcePanel(),
    // repoLink({ repo: "fwoosh-dev/fwoosh-3" }),
    // centeredDecorator(),
    // controlPanel(),
    // screens(),
    // a11y(),
  ],
});

declare module "fwoosh" {
  type PageMeta = typeof config;

  interface StoryMeta {
    options?: PageMeta["options"];
  }
}

export default config;
