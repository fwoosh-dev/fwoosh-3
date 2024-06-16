import { defineConfig } from "fwoosh";
import { zoomPlugin } from "@fwoosh/plugin-zoom";
import { descriptionPlugin } from "@fwoosh/plugin-description";

export default defineConfig({
  plugins: [zoomPlugin(), descriptionPlugin()],
});
