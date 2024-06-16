import { defineConfig } from "fwoosh";
import { zoomPlugin } from "@fwoosh/plugin-zoom";

export default defineConfig({
  plugins: [zoomPlugin()],
});
