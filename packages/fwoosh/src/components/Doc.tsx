import { Page } from "@fwoosh/types";
import { importPage } from "@fwoosh/pages";
import { Markdown } from "@fwoosh/ui/components";

async function DocExample({ page, name }: { page: Page; name: string }) {
  try {
    const mod = await importPage(page.file);
    const Example = mod[name];

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
      {/* @ts-expect-error Server Component */}
      <Markdown>{page.description}</Markdown>

      {page.stories.map(({ name, description }) => (
        <div key={name}>
          <h2>{name}</h2>
          {/* @ts-expect-error Server Component */}
          <Markdown>{description}</Markdown>
          <DocExample page={page} name={name} />
        </div>
      ))}
    </div>
  );
}
