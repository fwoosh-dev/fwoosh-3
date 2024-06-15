import { getAllStories } from "../../utils/stories";
import { Story } from "../../components/Story";

export default async function FirstStory() {
  const [firstStory] = await getAllStories();

  if (!firstStory) {
    return <div>No stories found</div>;
  }

  return <Story story={firstStory} />;
}
