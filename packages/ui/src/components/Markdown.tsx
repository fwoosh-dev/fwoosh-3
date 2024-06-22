import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkEmoji from "remark-emoji";
import { Code, Parent, Root, RootContent } from "mdast";
import { unified } from "unified";
import * as stylex from "@stylexjs/stylex";

import { highlightSyntax } from "../utils/highlightSyntax.js";
import { appChrome, borderRadius, space } from "../theme/tokens.stylex.js";

const styles = stylex.create({
  codeBlock: {
    borderColor: appChrome.subtleBorder,
    borderRadius: borderRadius.md,
    borderStyle: "solid",
    borderWidth: 1,
    margin: `${space[6]} 0`,
  },
});

export async function getAst(text: string): Promise<Root> {
  let ast: Root | undefined;

  await unified()
    // Pase markdown to AST
    .use(remarkParse, {})
    // Markdown plugins
    .use(remarkGfm)
    .use(remarkEmoji)
    .use(remarkUnwrapImages)
    // Caput the AST
    .use(function process() {
      this.compiler = function compiler(tree) {
        ast = tree as Root;
        return "";
      };
    })
    .process(text);

  if (!ast) {
    throw new Error("Could not parse markdown");
  }

  return ast;
}

function MarkdownNodeChildren({ node }: { node: Parent }) {
  return (
    <>
      {node.children.map((child, index) => (
        <MarkdownNode
          key={`${node.type}-${child.type}-${index}`}
          node={child}
        />
      ))}
    </>
  );
}

async function HighlightedCode({ node }: { node: Code }) {
  const html = await highlightSyntax(node.value, {
    lang: node.lang || "txt",
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      {...stylex.props(styles.codeBlock)}
    />
  );
}

function MarkdownNode({ node }: { node: Root | RootContent }) {
  if (node.type === "root") {
    return <MarkdownNodeChildren node={node} />;
  }

  switch (node.type) {
    case "paragraph":
      return (
        <p {...node.data}>
          <MarkdownNodeChildren node={node} />
        </p>
      );
    case "code":
      return <HighlightedCode node={node} />;
    case "text":
      return <span {...node.data}>{node.value}</span>;
    case "emphasis":
      return (
        <em {...node.data}>
          <MarkdownNodeChildren node={node} />
        </em>
      );
    case "strong":
      return (
        <strong {...node.data}>
          <MarkdownNodeChildren node={node} />
        </strong>
      );
    case "delete":
      return (
        <del {...node.data}>
          <MarkdownNodeChildren node={node} />
        </del>
      );
    case "inlineCode":
      return <code {...node.data}>{node.value}</code>;
    case "link":
      return (
        <a {...node.data}>
          <MarkdownNodeChildren node={node} />
        </a>
      );
    case "image":
      return <img {...node.data} />;
    case "list":
      return (
        <ul {...node.data}>
          <MarkdownNodeChildren node={node} />
        </ul>
      );
    case "listItem":
      return (
        <li {...node.data}>
          <MarkdownNodeChildren node={node} />
        </li>
      );
    case "heading": {
      const Component = `h${node.depth}` as keyof JSX.IntrinsicElements;

      return (
        <Component {...node.data}>
          <MarkdownNodeChildren node={node} />
        </Component>
      );
    }
    case "blockquote":
      return (
        <blockquote {...node.data}>
          <MarkdownNodeChildren node={node} />
        </blockquote>
      );
    case "thematicBreak":
      return <hr {...node.data} />;
    case "table":
      return (
        <table {...node.data}>
          <MarkdownNodeChildren node={node} />
        </table>
      );
    case "tableRow":
      return (
        <tr {...node.data}>
          <MarkdownNodeChildren node={node} />
        </tr>
      );
    case "tableCell":
      return (
        <td {...node.data}>
          <MarkdownNodeChildren node={node} />
        </td>
      );
    case "break":
      return <br {...node.data} />;
    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
}

export async function Markdown({ children }: { children: string }) {
  const ast = await getAst(children);
  return <MarkdownNode node={ast} />;
}
