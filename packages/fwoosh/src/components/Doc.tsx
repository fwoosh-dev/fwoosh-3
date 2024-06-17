import { Page } from "@fwoosh/types";
import { importPage } from "@fwoosh/pages";

async function DocExample({ page, name }: { page: Page; name: string }) {
  try {
    const mod = await importPage(page.file);
    const Example = mod[name];

    console.log("EXAMPLE", page.file, name);
    console.log("EXAMPLE", mod);

    if (!Example) {
      throw new Error("Could not find example");
    }

    return <Example />;
  } catch (error) {
    console.error("COULD NOT LOAD DOC");
    console.error(error);
  }
}

export async function Doc({ page }: { page: Page }) {
  if (!page.stories.length) {
    return <div>No examples found</div>;
  }

  return (
    <div>
      <h1>{page.title}</h1>
      <p>{page.description}</p>

      {page.stories.map(({ name, description }) => (
        <div key={name}>
          <h2>{name}</h2>
          <p>{description}</p>
          <DocExample page={page} name={name} />
        </div>
      ))}
    </div>
  );
}
