import { spawn } from "child_process";
import path from "path";
import { BuildCommand } from "./types.js";
import { createRequire } from "node:module";
import { fileURLToPath } from "url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

export async function build(options: BuildCommand) {
  const waku = require.resolve("waku").replace(/\/waku\/.*/, "/waku/cli.js");

  const child = spawn("node", [waku, "build", "--with-vercel-static"], {
    cwd: path.join(dirname, "../../../"),
    stdio: "inherit",
    env: {
      ...process.env,
      TARGET_DIRECTORY: process.cwd(),
      OUTPUT_DIRECTORY: options.out,
    },
  });

  child.on("exit", (code) => {
    process.exit(code);
  });
}
