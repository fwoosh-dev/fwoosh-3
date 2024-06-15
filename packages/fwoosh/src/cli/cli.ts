import { app, MultiCommand } from "command-line-application";
import { start } from "./start.js";
import { build } from "./build.js";

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

if (options._command === "build") {
  build();
} else if (options._command === "start") {
  start();
}
