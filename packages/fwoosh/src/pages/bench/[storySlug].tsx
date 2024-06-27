import { storyPreviewId } from "@fwoosh/types";

import { BenchLayout } from "../../components/BenchLayout";
import { getAllStorySlugs, getStoryBySlug } from "../../utils/stories";

import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  iframe: {
    display: "flex",
    height: "100%",
    width: "100%",
  },
});

export default async function Story({ storySlug }: { storySlug: string }) {
  const { page, story } = await getStoryBySlug(storySlug);

  return (
    <BenchLayout page={page} story={story}>
      <iframe
        id={storyPreviewId}
        src={`/iframe/${storySlug}`}
        {...stylex.props(styles.iframe)}
        style={{ border: "none" }}
      />
    </BenchLayout>
  );
}

export const getConfig = async () => {
  return {
    render: "static",
    staticPaths: await getAllStorySlugs(),
  };
};
