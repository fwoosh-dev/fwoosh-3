import { getPageById, parseStorySlug } from "../../utils/stories";

export default async function Iframe({ storySlug }: { storySlug: string }) {
  const { name, key } = parseStorySlug(storySlug);

  if (!name || !key) {
    return <div>Invalid story slug</div>;
  }

  const page = await getPageById(name);

  if (!page) {
    return <div>Page not found</div>;
  }

  const story = page.stories.find((s) => s.id === key);

  if (!story) {
    return <div>Story not found</div>;
  }

  const Example = (await import(page.file))[story.name];

  return <Example />;
}
