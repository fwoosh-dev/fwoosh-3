import { Meta, StoryContext } from "@fwoosh/types";
import docgen from "react-docgen-typescript";

const defaultOptions: docgen.ParserOptions = {
  propFilter: (prop) => {
    return prop.parent
      ? !prop.parent.fileName.includes("@types/react") &&
          !prop.parent.fileName.includes("@emotion")
      : true;
  },
};

export default async function ReactDocgenPanel({ page, story }: StoryContext) {
  const { meta } = (await import(
    /* @vite-ignore */ `/fwoosh-meta?file=${page.file}`
  )) as { meta: Meta };

  const { fwoosh_file } = (meta.component || {}) as { fwoosh_file: string };

  if (!fwoosh_file) {
    return <div>No component configured for documentation</div>;
  }

  const docs = docgen.parse(fwoosh_file, defaultOptions);
  const doc = docs.find(
    (d) => d.displayName === (meta.component as any).displayName
  );

  if (!doc) {
    return <div>No documentation found for component</div>;
  }

  const { props, description } = doc;

  if (!props || !description) {
    return <div>No documentation found for component</div>;
  }

  const propEntries = Object.values(props);

  return (
    <div>
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
    </div>
  );
}
