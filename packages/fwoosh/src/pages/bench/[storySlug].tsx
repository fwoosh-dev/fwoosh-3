import { storyPreviewId } from "@fwoosh/types";
import { StoryContextProvider } from "@fwoosh/ui";

import { BenchLayout } from "../../components/BenchLayout";
import { getStoryBySlug } from "../../utils/stories";

export default async function Story({ storySlug }: { storySlug: string }) {
  const { page, story } = await getStoryBySlug(storySlug);

  return (
    <StoryContextProvider page={page} story={story}>
      <BenchLayout>
        <iframe id={storyPreviewId} src={`/iframe/${storySlug}`} />
      </BenchLayout>
    </StoryContextProvider>
  );
}
