import type { PlopTypes } from "@turbo/gen";
import { execSync } from "child_process";

const namePrompt = {
  type: "input",
  name: "name",
  message: "What is the name of the package?",
};

const descriptionPrompt = {
  type: "input",
  name: "description",
  message: "What is the description of the package?",
};

const runInstallAction = () => {
  execSync("pnpm install", { stdio: "inherit" });
  return "Updated dependencies";
};

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("package", {
    description: "Create a new package",
    // gather information from the user
    prompts: [namePrompt, descriptionPrompt],
    // perform actions based on the prompts
    actions: [
      {
        type: "add",
        path: "packages/{{kebabCase name}}/package.json",
        templateFile: "templates/package.hbs",
      },
      {
        type: "add",
        path: "packages/{{kebabCase name}}/README.md",
        templateFile: "templates/README.hbs",
      },
      {
        type: "add",
        path: "packages/{{kebabCase name}}/tsconfig.json",
        templateFile: "templates/tsconfig.hbs",
      },
      {
        type: "add",
        path: "packages/{{kebabCase name}}/src/index.ts",
        templateFile: "templates/index.hbs",
      },
      runInstallAction,
    ],
  });

  plop.setGenerator("plugin", {
    description: "Create a new package",
    // gather information from the user
    prompts: [namePrompt, descriptionPrompt],
    // perform actions based on the prompts
    actions: [
      {
        type: "add",
        path: "packages/plugin-{{kebabCase name}}/package.json",
        templateFile: "templates/plugin/package.hbs",
      },
      {
        type: "add",
        path: "packages/plugin-{{kebabCase name}}/README.md",
        templateFile: "templates/README.hbs",
      },
      {
        type: "add",
        path: "packages/plugin-{{kebabCase name}}/tsconfig.json",
        templateFile: "templates/tsconfig-react.hbs",
      },
      {
        type: "add",
        path: "packages/plugin-{{kebabCase name}}/src/index.ts",
        templateFile: "templates/plugin/index.hbs",
      },
      {
        type: "add",
        path: "packages/plugin-{{kebabCase name}}/src/types.ts",
        templateFile: "templates/plugin/types.hbs",
      },
      {
        type: "add",
        path: "packages/plugin-{{kebabCase name}}/src/{{pascalCase name}}.tsx",
        templateFile: "templates/plugin/component.hbs",
      },
      runInstallAction,
    ],
  });
}
