import { getPageById, parseStorySlug } from "../../utils/stories";
import { Doc } from "../../components/Doc";

export default async function DocViewer({ docSlug }: { docSlug: string }) {
  const { name } = parseStorySlug(docSlug);

  if (!name) {
    return <div>Invalid doc slug</div>;
  }

  const page = await getPageById(name);

  if (!page) {
    return <div>Doc not found</div>;
  }

  return <Doc page={page} />;
}
