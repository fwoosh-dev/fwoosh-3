import { defineConfig } from "fwoosh";
import { zoomPlugin } from "@fwoosh/plugin-zoom";
import { descriptionPlugin } from "@fwoosh/plugin-description";
import { reactDocgen } from "@fwoosh/plugin-react-docgen";
import { sourcePanel } from "@fwoosh/plugin-source-panel";

export default defineConfig({
  docgen: ["**/*.tsx"],
  plugins: [zoomPlugin(), descriptionPlugin(), reactDocgen(), sourcePanel()],
});
