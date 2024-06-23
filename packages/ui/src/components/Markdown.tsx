import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkEmoji from "remark-emoji";
import {
  Code,
  Heading,
  Parent,
  Root,
  RootContent,
  Table as TableType,
} from "mdast";
import { unified } from "unified";
import * as stylex from "@stylexjs/stylex";

import { highlightSyntax } from "../utils/highlightSyntax.js";
import { appChrome, borderRadius, space } from "../theme/tokens.stylex.js";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "./Table.js";

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

function MarkdownHeading({ node }: { node: Heading }) {
  const Component = `h${node.depth}` as keyof JSX.IntrinsicElements;

  return (
    <Component {...node.data}>
      <MarkdownNodeChildren node={node} />
    </Component>
  );
}

function UnimplementedNode({ node }: { node: RootContent }): JSX.Element {
  throw new Error(`Unsupported node type: ${node.type}`);
}

const nodeTypeToComponent = {
  blockquote: "blockquote",
  break: "br",
  code: HighlightedCode,
  delete: "del",
  emphasis: "em",
  heading: MarkdownHeading,
  image: "img",
  inlineCode: "code",
  link: "a",
  list: "ul",
  listItem: "li",
  paragraph: "p",
  strong: "strong",
  table: ({ node, ...props }: { node: TableType }) => {
    const [head, ...rows] = node.children;

    return (
      <Table {...props}>
        <TableHeader>
          {head?.children.map((cell, index) => (
            <TableColumn isRowHeader key={`${node.type}-${cell.type}-${index}`}>
              <MarkdownNodeChildren node={cell} />
            </TableColumn>
          ))}
        </TableHeader>

        <TableBody>
          <MarkdownNodeChildren node={{ ...node, children: rows }} />
        </TableBody>
      </Table>
    );
  },
  tableCell: TableCell,
  tableRow: TableRow,
  text: "span",
  thematicBreak: "hr",
  definition: UnimplementedNode,
  footnoteDefinition: UnimplementedNode,
  footnoteReference: UnimplementedNode,
  html: UnimplementedNode,
  yaml: UnimplementedNode,
  imageReference: UnimplementedNode,
  linkReference: UnimplementedNode,
} satisfies Record<RootContent["type"], React.ElementType>;

function MarkdownNode({ node }: { node: Root | RootContent }) {
  if (node.type === "root") {
    return <MarkdownNodeChildren node={node} />;
  }

  const Component = nodeTypeToComponent[node.type];

  if (typeof Component === "string") {
    return (
      <Component {...node.data}>
        {"children" in node ? (
          <MarkdownNodeChildren node={node} />
        ) : "value" in node ? (
          node.value
        ) : (
          ""
        )}
      </Component>
    );
  } else {
    console.log(node);
    return (
      <Component node={node as never}>
        {"children" in node ? (
          <MarkdownNodeChildren node={node} />
        ) : "value" in node ? (
          node.value
        ) : (
          ""
        )}
      </Component>
    );
  }
}

export async function Markdown({ children }: { children: string }) {
  const ast = await getAst(children);
  return <MarkdownNode node={ast} />;
}
