import { getAllPageGroups, getStorySlug } from "../../utils/stories";
import Story from "./[storySlug]";
import { BenchLayout } from "../../components/BenchLayout";

export default async function FirstStory() {
  const groups = await getAllPageGroups();
  const page = Object.values(groups).flat()[0];

  if (!page) {
    return <div>No page found</div>;
  }

  const firstStory = page.stories[0];

  if (!firstStory) {
    return <div>No story found</div>;
  }

  return (
    <BenchLayout page={page} story={firstStory}>
      <Story storySlug={getStorySlug(page, firstStory)} />
    </BenchLayout>
  );
}
