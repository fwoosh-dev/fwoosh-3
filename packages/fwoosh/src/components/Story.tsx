import { importPage } from "@fwoosh/pages";
import { Page } from "@fwoosh/types";

export async function Story({ page }: { page: Page }) {
  const firstStory = page.stories[0];

  if (!firstStory) {
    return <div>No examples found</div>;
  }

  try {
    const mod = await importPage(page.file);
    const Example = mod[firstStory.name];

    if (!Example) {
      throw new Error("Could not find example");
    }

    return <Example />;
  } catch (error) {
    console.error("COULD NOT LOAD STORY");
    console.error(error);
  }
}
