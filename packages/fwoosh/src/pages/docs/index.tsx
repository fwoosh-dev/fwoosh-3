import { getAllPageGroups } from "../../utils/stories";
import { Doc } from "../../components/Doc";

export default async function FirstPage() {
  const allStories = await getAllPageGroups();
  const firstPage = Object.values(allStories).flat()[0];

  if (!firstPage) {
    return <div>No docs found</div>;
  }

  return <Doc page={firstPage} />;
}
