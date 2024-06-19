import { StoryContext } from "@fwoosh/types";
import { importMeta } from "@fwoosh/pages";
import {
  InlineCode,
  TabPanelContent,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@fwoosh/ui/components";
import docgen from "react-docgen-typescript";

const defaultOptions: docgen.ParserOptions = {
  propFilter: (prop) => {
    return prop.parent
      ? !prop.parent.fileName.includes("@types/react") &&
          !prop.parent.fileName.includes("@emotion")
      : true;
  },
};

export default async function ReactDocgenPanel({ page }: StoryContext) {
  const { component = [] } = await importMeta(page.file);
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
            {description && <div>{description}</div>}
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
                          <InlineCode>{prop.type.name}</InlineCode>
                        </TableCell>
                        <TableCell>
                          {prop.defaultValue?.value && (
                            <InlineCode>{prop.defaultValue?.value}</InlineCode>
                          )}
                        </TableCell>
                        <TableCell>{prop.description}</TableCell>
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
