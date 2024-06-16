import { app, MultiCommand } from "command-line-application";
import { lilconfig } from "lilconfig";
const findCacheDirectoryPromise = import("find-cache-dir");
import { promises as fs } from "fs";
import path from "path";

import { start } from "./start.js";
import { build } from "./build.js";

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
  commands: [
    {
      name: "build",
      description: "Build the component documentation for deployment",
    },
    {
      name: "start",
      description: "Start the component documentation",
    },
  ],
};

const args = app(fwoosh);

if (args?.error) {
  console.error(args.error);
  process.exit(1);
}

const options = args as
  | {
      _command: "build";
    }
  | {
      _command: "start";
    };

async function main() {
  // @ts-ignore
  await import("tsx");
  const fwooshConfig = (await explorer.search()) ?? {};
  const findCacheDirectory = (await findCacheDirectoryPromise).default;
  const cacheDir = findCacheDirectory({ name: "fwoosh", create: true });

  if (!cacheDir) {
    throw new Error("Could not find cache directory");
  }

  console.log({ fwooshConfig });
  await fs.writeFile(
    path.join(cacheDir, "fwoosh.config.json"),
    JSON.stringify(fwooshConfig)
  );

  if (options._command === "build") {
    build();
  } else if (options._command === "start") {
    start();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
