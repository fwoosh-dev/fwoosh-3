import { importPage } from "@fwoosh/pages";
import { getAllStorySlugs, getStoryBySlug } from "../../utils/stories";

export default async function Iframe({ storySlug }: { storySlug: string }) {
  try {
    const { page, story } = await getStoryBySlug(storySlug);
    const Example = (await importPage(page.file))[story.name];

    if (!Example) {
      throw new Error("Could not find example");
    }

    return <Example />;
  } catch (error) {
    console.error("COULD NOT LOAD STORY IN IFRAME");
    console.error(error);
  }
}

export const getConfig = async () => {
  return {
    render: "static",
    staticPaths: await getAllStorySlugs(),
  };
};
