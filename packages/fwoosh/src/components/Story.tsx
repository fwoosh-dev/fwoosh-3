import { Story } from "../utils/stories";

export async function Story({ story }: { story: Story }) {
  const firstExample = story.stories[0];

  if (!firstExample) {
    return <div>No examples found</div>;
  }

  /* @vite-ignore */
  const mod = await import(story.file);
  const Example = mod[firstExample];

  return <Example />;
}
