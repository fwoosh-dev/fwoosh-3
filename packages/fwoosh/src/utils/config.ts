import { FwooshConfig } from "@fwoosh/types";
import invariant from "invariant";

export async function getConfig(): Promise<FwooshConfig> {
  const configPath = process.env.FWOOSH_CONFIG;

  invariant(configPath, "Could not find fwoosh config");

  const config = await import(configPath).then((mod) => mod.default);

  return config;
}
