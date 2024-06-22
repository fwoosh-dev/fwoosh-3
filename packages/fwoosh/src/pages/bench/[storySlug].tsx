import { storyPreviewId } from "@fwoosh/types";

import { BenchLayout } from "../../components/BenchLayout";
import { getAllStorySlugs, getStoryBySlug } from "../../utils/stories";

export default async function Story({ storySlug }: { storySlug: string }) {
  const { page, story } = await getStoryBySlug(storySlug);

  return (
    <BenchLayout page={page} story={story}>
      <iframe
        id={storyPreviewId}
        src={`/iframe/${storySlug}`}
        style={{ height: "100%", width: "100%", border: "none" }}
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
