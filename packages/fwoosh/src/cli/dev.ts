import { spawn } from "child_process";
import path from "path";
import { createRequire } from "node:module";
import { fileURLToPath } from "url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

export async function dev() {
  const waku = require.resolve("waku").replace(/\/waku\/.*/, "/waku/cli.js");

  const child = spawn("node", [waku, "dev"], {
    cwd: path.join(dirname, "../../../"),
    stdio: "inherit",
    env: {
      ...process.env,
      TARGET_DIRECTORY: process.cwd(),
    },
  });

  child.on("exit", (code) => {
    process.exit(code);
  });
}
