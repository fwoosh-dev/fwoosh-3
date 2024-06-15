import { getStoryByName, parseStorySlug } from "../../utils/stories";
import { Doc } from "../../components/Doc";

export default async function DocViewer({ docSlug }: { docSlug: string }) {
  const { name } = parseStorySlug(docSlug);

  if (!name) {
    return <div>Invalid doc slug</div>;
  }

  const story = await getStoryByName(name);

  console.log({ name });

  if (!story) {
    return <div>Doc not found</div>;
  }

  return <Doc story={story} />;
}
