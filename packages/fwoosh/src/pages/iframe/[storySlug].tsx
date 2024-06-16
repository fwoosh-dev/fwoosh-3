import { getStoryBySlug } from "../../utils/stories";

export default async function Iframe({ storySlug }: { storySlug: string }) {
  const { page, story } = await getStoryBySlug(storySlug);
  const Example = (await import(/* @vite-ignore */ page.file))[story.name];

  return <Example component={Example} />;
}
