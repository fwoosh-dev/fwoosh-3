import { FwooshPluginConfig } from "@fwoosh/types";
import { resolveFile } from "@fwoosh/types/resolve-file";
import { CenteredDecoratorOptions } from "./types.js";

export { CenteredDecoratorOptions } from "./types.js";
export function centeredDecorator(options: CenteredDecoratorOptions = {}) {
  return {
    tools: [
      {
        type: "decorator",
        id: "centered" as const,
        filepath: resolveFile("CenteredDecorator.js"),
        options: {
          enabled: true,
          ...options,
        } as CenteredDecoratorOptions,
      },
    ],
  } satisfies FwooshPluginConfig;
}
