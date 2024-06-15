import { getStoryById, parseStorySlug } from "../../utils/stories";

export default async function Story({ storySlug }: { storySlug: string }) {
  const { name, key } = parseStorySlug(storySlug);

  if (!name || !key) {
    return <div>Invalid story slug</div>;
  }

  const story = await getStoryById(name);

  if (!story) {
    return <div>Story not found</div>;
  }

  const Example = (await import(story.file))[key];

  return <Example />;
}
