import { storyPreviewId } from "@fwoosh/types";

import { BenchLayout } from "../../components/BenchLayout";
import { getStoryBySlug } from "../../utils/stories";

export default async function Story({ storySlug }: { storySlug: string }) {
  const { page, story } = await getStoryBySlug(storySlug);

  return (
    <BenchLayout page={page} story={story}>
      <iframe id={storyPreviewId} src={`/iframe/${storySlug}`} />
    </BenchLayout>
  );
}
