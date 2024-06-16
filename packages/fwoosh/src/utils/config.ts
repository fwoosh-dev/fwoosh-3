import { FwooshConfig } from "@fwoosh/types";
import findCacheDirectory from "find-cache-dir";
import { promises as fs } from "fs";
import path from "path";

export async function getConfig() {
  const cacheDir = findCacheDirectory({
    name: "fwoosh",
    cwd: process.env.TARGET_DIRECTORY ?? process.cwd(),
  });

  if (!cacheDir) {
    throw new Error("Could not find cache directory");
  }

  const configPath = path.join(cacheDir, "fwoosh.config.json");
  const config = await fs.readFile(configPath, "utf-8");

  return JSON.parse(config) as { config: FwooshConfig; filepath: string };
}
