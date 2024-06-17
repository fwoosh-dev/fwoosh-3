import { StoryContext } from "@fwoosh/types";
import { importMeta } from "@fwoosh/pages";
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
    return <div>No documentation found for component</div>;
  }

  return (
    <div>
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
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {propEntries.map((prop) => (
                    <tr key={prop.name}>
                      <td>{prop.name}</td>
                      <td>{prop.type.name}</td>
                      <td>{prop.defaultValue}</td>
                      <td>{prop.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        );
      })}
    </div>
  );
}
