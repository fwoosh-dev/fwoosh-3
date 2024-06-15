import { getAllStories } from "../../utils/stories";
import { Doc } from "../../components/Doc";

export default async function FirstStory() {
  const allStories = await getAllStories();
  const firstStory = Object.values(allStories).flat()[0];

  if (!firstStory) {
    return <div>No docs found</div>;
  }

  return <Doc story={firstStory} />;
}
