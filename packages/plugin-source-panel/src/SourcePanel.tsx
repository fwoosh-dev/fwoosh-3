import path from "path";
import { promises as fs } from "fs";
import * as stylex from "@stylexjs/stylex";

import { StoryContext, getStorySlug } from "@fwoosh/types";
import { highlightSyntax } from "@fwoosh/ui/utils/highlightSyntax";

import { ScrollToHighlight } from "./ScrollToHighlight.js";

async function getHighlightLines(
  file: string,
  contents: string,
  storyName: string
) {
  try {
    const ts = await import("typescript").then((mod) => mod.default);
    const sourceFile = ts.createSourceFile(
      file,
      contents,
      ts.ScriptTarget.Latest
    );
    const definition = sourceFile.statements.find(
      (statement) =>
        ts.isVariableStatement(statement) &&
        statement.declarationList.declarations.find(
          (declaration) =>
            declaration.name.getText(sourceFile) === storyName &&
            ts.isIdentifier(declaration.name)
        )
    );

    if (definition) {
      const start = sourceFile.getLineAndCharacterOfPosition(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (definition as any).declarationList?.pos || definition.pos
      );
      const end = sourceFile.getLineAndCharacterOfPosition(definition.end);

      return new Array(end.line - start.line + 1)
        .fill(0)
        .map((_, i) => start.line + i + 1);
    }

    const functionDefinition = sourceFile.statements.find(
      (statement) =>
        ts.isFunctionDeclaration(statement) &&
        statement.name?.getText(sourceFile) === storyName
    );

    if (functionDefinition) {
      const start = sourceFile.getLineAndCharacterOfPosition(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (functionDefinition as any).name?.pos || functionDefinition.pos
      );
      const end = sourceFile.getLineAndCharacterOfPosition(
        functionDefinition.end
      );

      return new Array(end.line - start.line + 1)
        .fill(0)
        .map((_, i) => start.line + i + 1);
    }
  } catch {
    // Don't really care if this fails
  }
}

const styles = stylex.create({
  base: {
    height: "100%",
  },
});

export default async function SourcePanel({ page, story }: StoryContext) {
  const contents = await fs.readFile(page.file, "utf-8");
  const highlightLines = await getHighlightLines(
    page.file,
    contents,
    story.name
  );
  const html = await highlightSyntax(contents, {
    highlightLines,
    lang: path.extname(page.file).slice(1),
  });

  return (
    <>
      <ScrollToHighlight key={getStorySlug(page, story)} target="first-line" />
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        {...stylex.props(styles.base)}
      />
    </>
  );
}
