import { getAllStories } from "../../utils/stories";
import { Doc } from "../../components/Doc";

export default async function FirstStory() {
  const [firstStory] = await getAllStories();

  if (!firstStory) {
    return <div>No docs found</div>;
  }

  return <Doc story={firstStory} />;
}
