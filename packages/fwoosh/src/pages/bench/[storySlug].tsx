import { storyPreviewId } from "@fwoosh/types";

export default async function Story({ storySlug }: { storySlug: string }) {
  return <iframe id={storyPreviewId} src={`/iframe/${storySlug}`} />;
}
