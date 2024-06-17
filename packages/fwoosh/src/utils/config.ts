import { FwooshConfig } from "@fwoosh/types";
import fs from "fs";
import findCacheDirectory from "find-cache-dir";
import path from "path";

export function getConfig() {
  const cacheDir = findCacheDirectory({
    name: "fwoosh",
    cwd: process.env.TARGET_DIRECTORY ?? process.cwd(),
  });

  if (!cacheDir) {
    throw new Error("Could not find cache directory");
  }

  const configPath = path.join(cacheDir, "fwoosh.config.json");
  const config = fs.readFileSync(configPath, "utf-8");

  return JSON.parse(config) as { config: FwooshConfig; filepath: string };
}
