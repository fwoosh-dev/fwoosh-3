import { StoryContext } from "@fwoosh/types";
import { getAllPageGroups, getStorySlug } from "../utils/stories";
import { TreeView } from "./TreeView";

export async function StoryList({ page, story }: StoryContext) {
  const pageGroups = await getAllPageGroups();
  const treeGroups = Object.entries(pageGroups).map(([group, pages]) => {
    return {
      id: group,
      label: group,
      children: pages.map((page) => ({
        ...page,
        id: page.id,
        label: page.title,
        children: page.stories.map((story) => ({
          ...story,
          id: getStorySlug(page, story),
          label: story.name,
        })),
      })),
    };
  });

  return <TreeView data={treeGroups} activeId={getStorySlug(page, story)} />;
}
