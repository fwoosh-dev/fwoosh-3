import { getAllPageGroups, getStorySlug } from "../../utils/stories";
import Story from "./[storySlug]";

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

  return <Story storySlug={getStorySlug(page, firstStory)} />;
}
