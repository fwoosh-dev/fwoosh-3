import { StoryContext } from "@fwoosh/types";
import { importMeta } from "@fwoosh/pages";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@fwoosh/ui/components/Table";
import { InlineCode } from "@fwoosh/ui/components/InlineCode";
import { TabPanelContent } from "@fwoosh/ui/components/Tabs";
import { Markdown } from "@fwoosh/ui/components/Markdown";
import docgen from "react-docgen-typescript";
import { highlightSyntax } from "@fwoosh/ui/utils/highlightSyntax";

const defaultOptions: docgen.ParserOptions = {
  propFilter: (prop) => {
    return prop.parent
      ? !prop.parent.fileName.includes("@types/react") &&
          !prop.parent.fileName.includes("@emotion")
      : true;
  },
};

async function TypeCell({ type }: { type: string }) {
  const html = await highlightSyntax(type, {
    lang: "ts",
    meta: {
      class: "code",
    },
  });

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export default async function ReactDocgenPanel({ page }: StoryContext) {
  const { component = [] } = await importMeta(page.file).then(
    (mod) => mod.meta
  );
  const components = Array.isArray(component) ? component : [component];
  const fwooshFiles = new Set(components.map((c) => c.fwoosh_file));
  const docComponents = new Set(components.map((c) => c.displayName));
  const docs: docgen.ComponentDoc[] = [];

  for (const fwooshFile of fwooshFiles) {
    const doc = docgen.parse(fwooshFile, defaultOptions);
    const docWithFile = doc.find((d) => docComponents.has(d.displayName));

    if (!docWithFile) {
      continue;
    }

    docs.push(docWithFile);
  }

  if (!docs.length) {
    return (
      <TabPanelContent>No documentation found for component</TabPanelContent>
    );
  }

  return (
    <TabPanelContent>
      {docs.map((doc) => {
        const { props, description } = doc;

        if (!props || !description) {
          return null;
        }

        const propEntries = Object.values(props);

        return (
          <>
            {/* @ts-expect-error Server Component */}
            {description && <Markdown>{description}</Markdown>}

            {propEntries.length > 0 && (
              <Table selectionMode="single">
                <TableHeader>
                  <TableColumn isRowHeader={true}>Name</TableColumn>
                  <TableColumn>Type</TableColumn>
                  <TableColumn>Default</TableColumn>
                  <TableColumn>Description</TableColumn>
                </TableHeader>
                <TableBody>
                  {propEntries.map((prop) => {
                    return (
                      <TableRow key={prop.name}>
                        <TableCell>
                          <InlineCode>{prop.name}</InlineCode>
                        </TableCell>
                        <TableCell>
                          <InlineCode>
                            {/* @ts-expect-error Server Component */}
                            <TypeCell type={prop.type.name} />
                          </InlineCode>
                        </TableCell>
                        <TableCell>
                          {prop.defaultValue?.value && (
                            <InlineCode>{prop.defaultValue?.value}</InlineCode>
                          )}
                        </TableCell>
                        <TableCell>
                          {/* @ts-expect-error Server Component */}
                          <Markdown>{prop.description}</Markdown>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </>
        );
      })}
    </TabPanelContent>
  );
}
