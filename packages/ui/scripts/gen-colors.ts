/// <reference types="node" />

import * as colors from "@radix-ui/colors";
import dedent from "dedent";
import { promises as fs } from "fs";
import path from "path";

async function main() {
  let file = dedent`
    import * as stylex from "@stylexjs/stylex";

  `;

  for (const [name, color] of Object.entries(colors)) {
    if (name === "__esModule" || name === "default") {
      continue;
    }

    const colorArray = Object.values(color);

    file += "\n";
    file += dedent`
      /**
       * Each step was designed for at least one specific use case.
       */
      export const ${name} = stylex.defineVars({
        /** 
         * Step 1: App background
         * Steps \`appBg\` and \`subtleBg\' are designed for app backgrounds and subtle component backgrounds.
         */
        appBg: "${colorArray[0]}",
        /**
         * Step 2: Subtle background
         * Steps \`appBg\` and \`subtleBg\' are designed for app backgrounds and subtle component backgrounds.
         */ 
        subtleBg: "${colorArray[1]}",
        /**
         * Step 3: UI element background
         * Steps \`elementBg\`, \`hover\`, and \`active\` are designed for UI component backgrounds.
         */ 
        elementBg: "${colorArray[2]}",
        /**
         * Step 4: Hovered UI element background
         * Steps \`elementBg\`, \`hover\`, and \`active\` are designed for UI component backgrounds.
         */
        hover: "${colorArray[3]}",
        /**
         * Step 5: Active / Selected UI element background
         * Steps \`elementBg\`, \`hover\`, and \`active\` are designed for UI component backgrounds.
         */
        active: "${colorArray[4]}",
        /** 
         * Step 6: Subtle borders and separators
         * Designed for subtle borders on components which are not interactive. For example sidebars, headers, cards, alerts, and separators.
         */
        subtleBorder: "${colorArray[5]}",
        /**
         * Step 7: UI element border and focus rings
         * Designed for subtle borders on interactive components.
         */ 
        elementBorder: "${colorArray[6]}",
        /** 
         * Step 8: Hovered UI element border
         * Designed for stronger borders on interactive components and focus rings.
         */ 
        hoveredBorder: "${colorArray[7]}",
        /** 
         * Step 9: Solid background
         * Has the highest chroma of all steps in the scale. In other words, it's the purest step, the step mixed with the least amount of white or black. Because \`solid\` is the purest step, it has a wide range of applications:
         * 
         * - Website/App backgrounds
         * - Website section backgrounds
         * - Header backgrounds
         * - Component backgrounds
         * - Graphics/Logos
         * - Overlays
         * - Coloured shadows
         * - Accent borders
         */
        solid: "${colorArray[8]}",
        /**
         * Step 10: Hovered solid backgrounds
         * Designed for component hover states, where step \`solid\` is the component's normal state background.
         */ 
        hoveredSolid: "${colorArray[9]}",
        /**
         * Step 11: Low-contrast text
         * Designed for low-contrast text.
         */ 
        subtleText: "${colorArray[10]}",
        /**
         * Step 12: High-contrast text
         * Designed for high-contrast text.
         */ 
        text: "${colorArray[11]}",
      });
    `;
    file += "\n";
  }

  const dir = path.join(process.cwd(), "src/theme/colors.stylex.ts");
  await fs.writeFile(dir, file);
}

main();
