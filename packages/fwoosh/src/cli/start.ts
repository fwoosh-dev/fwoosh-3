import { spawn } from "child_process";
import path from "path";

export async function start() {
  const waku = require.resolve("waku").replace(/\/waku\/.*/, "/waku/cli.js");

  const child = spawn("node", [waku, "dev"], {
    cwd: path.join(__dirname, "../../../"),
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
