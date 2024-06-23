import { defineConfig } from "fwoosh";
import { zoomPlugin } from "@fwoosh/plugin-zoom";
import { descriptionPlugin } from "@fwoosh/plugin-description";
import { reactDocgen } from "@fwoosh/plugin-react-docgen";
import { sourcePanel } from "@fwoosh/plugin-source-panel";
import { repoLink } from "@fwoosh/plugin-repo-link";

export default defineConfig({
  theme: {
    chrome: "sand",
    primary: "orange",
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
  ],
});
