import { getAllPageGroups } from "../../utils/stories";
import { Story } from "../../components/Story";

export default async function FirstStory() {
  const stories = await getAllPageGroups();
  const firstStory = Object.values(stories).flat()[0];

  if (!firstStory) {
    return <div>No stories found</div>;
  }

  return <Story story={firstStory} />;
}
