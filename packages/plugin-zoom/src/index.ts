import { FwooshPluginConfig } from "@fwoosh/types";
import path from "path";
import { resolveFile } from "@fwoosh/types/resolve-file";

const dirname = path.dirname(
  typeof __filename === "string"
    ? __filename
    : // @ts-ignore
      import.meta.url
);

export function zoomPlugin(): FwooshPluginConfig {
  console.log({ dirname });
  return {
    tools: [
      {
        id: "zoom",
        type: "toolbar",
        scope: "story",
        filepath: path.join(dirname, "ZoomToolbarControl.js"),
      },
    ],
  };
}
