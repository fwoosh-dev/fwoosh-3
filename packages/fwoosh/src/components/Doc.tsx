import { Page, Story } from "@fwoosh/types";
import { importPage } from "@fwoosh/pages";
import { Markdown } from "@fwoosh/ui/components/Markdown";
import { StoryContextProvider } from "@fwoosh/ui";

async function DocExample({ page, story }: { page: Page; story: Story }) {
  try {
    const mod = await importPage(page.file);
    const Example = mod[story.name];

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

      {page.stories.map((story) => (
        <StoryContextProvider page={page} story={story}>
          <div key={story.name}>
            <h2>{story.name}</h2>
            {/* @ts-expect-error Server Component */}
            <Markdown>{story.description}</Markdown>
            <DocExample page={page} story={story} />
          </div>
        </StoryContextProvider>
      ))}
    </div>
  );
}
