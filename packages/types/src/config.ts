import { FwooshConfig } from "./index.js";
import invariant from "invariant";

export async function getConfig(): Promise<FwooshConfig> {
  const configPath = process.env.FWOOSH_CONFIG;

  invariant(configPath, "Could not find fwoosh config");

  const config = await import(/* @vite-ignore */ configPath).then((mod) => {
    // TODO: ....idk
    if ("default" in mod.default) {
      return mod.default.default;
    }

    return mod.default;
  });

  return config;
}
