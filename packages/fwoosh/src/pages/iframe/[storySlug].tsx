import { importPage } from "@fwoosh/pages";
import { getAllStorySlugs, getStoryBySlug } from "../../utils/stories";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  base: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
});

export default async function Iframe({ storySlug }: { storySlug: string }) {
  try {
    const { page, story } = await getStoryBySlug(storySlug);
    const Example = (await importPage(page.file))[story.name];

    if (!Example) {
      throw new Error("Could not find example");
    }

    return (
      <div {...stylex.props(styles.base)}>
        <Example />
      </div>
    );
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
