import { app, MultiCommand } from "command-line-application";
import { lilconfig } from "lilconfig";
const findCacheDirectoryPromise = import("find-cache-dir");
import { promises as fs } from "fs";
import path from "path";

import { FwooshConfig } from "@fwoosh/types";

import { dev } from "./dev.js";
import { build } from "./build.js";
import { start } from "./start.js";
import { Options } from "./types.js";

const explorer = lilconfig("fwoosh", {
  searchPlaces: ["fwoosh.config.ts", "fwoosh.config.js"],
  loaders: {
    ".ts": async (filepath: string, content: string) => {
      const config = await import(filepath).then(
        (mod) => mod.default?.default || mod.default
      );
      return config;
    },
  },
});

const fwoosh: MultiCommand = {
  name: "fwoosh",
  description: "A tool for building components",
  options: [
    {
      name: "out",
      alias: "o",
      description: "The output directory for the build",
      type: String,
      defaultValue: "out",
    },
  ],
  commands: [
    {
      name: "build",
      description: "Build the component documentation for deployment",
    },
    {
      name: "start",
      description: "Start the build from `fwoosh build`",
    },
    {
      name: "dev",
      description: "Start the component documentation in development mode",
    },
  ],
};

const args = app(fwoosh);

if (args?.error) {
  console.error(args.error);
  process.exit(1);
}

const options = args as Options;

async function main() {
  // @ts-ignore
  // await import("tsx");
  const fwooshConfig = await explorer.search();
  const findCacheDirectory = (await findCacheDirectoryPromise).default;
  const cacheDir = findCacheDirectory({ name: "fwoosh", create: true });

  if (!cacheDir) {
    throw new Error("Could not find cache directory");
  }

  await fs.writeFile(
    path.join(cacheDir, "fwoosh.config.json"),
    JSON.stringify(fwooshConfig)
  );

  const mergeOptions = {
    ...options,
    out: path.join(
      process.cwd(),
      (fwooshConfig?.config as FwooshConfig).out || options.out
    ),
  };

  if (mergeOptions._command === "build") {
    build(mergeOptions);
  } else if (mergeOptions._command === "start") {
    start(mergeOptions);
  } else if (options._command === "dev") {
    dev();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
