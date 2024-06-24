import { app, MultiCommand } from "command-line-application";
import { lilconfig } from "lilconfig";
import path from "path";
import esbuild from "esbuild";

import { defaultConfig, FwooshConfig } from "@fwoosh/types";

import { dev } from "./dev.js";
import { build } from "./build.js";
import { start } from "./start.js";
import { Options } from "./types.js";
import findCacheDir from "find-cache-dir";

const explorer = lilconfig("fwoosh", {
  searchPlaces: ["fwoosh.config.ts", "fwoosh.config.js"],
  loaders: {
    ".ts": async (filepath: string) => {
      // @ts-expect-error They don't have a types file
      await import("tsx");
      const config = await import(filepath).then(
        (mod) => mod.default?.default || mod.default
      );
      const cacheDir = findCacheDir({ name: "fwoosh", create: true })!;
      process.env.FWOOSH_CONFIG = path.join(cacheDir, "fwoosh.config.mjs");

      await esbuild.build({
        entryPoints: [filepath],
        outdir: cacheDir,
        outExtension: { ".js": ".mjs" },
        target: "es2020",
        platform: "node",
        format: "esm",
      });

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
      defaultValue: defaultConfig.out,
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
  const fwooshConfig = await explorer.search();

  if (!fwooshConfig) {
    throw new Error("Could not find fwoosh config");
  }

  const config = fwooshConfig.config as FwooshConfig;
  process.env.FWOOSH_CONFIG ||= fwooshConfig.filepath;

  const mergeOptions = {
    ...options,
    out: path.join(process.cwd(), config.out || options.out),
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
