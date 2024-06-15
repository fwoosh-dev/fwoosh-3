export default async function Story({ storySlug }: { storySlug: string }) {
  return <iframe src={`/iframe/${storySlug}`} />;
}
