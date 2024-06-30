import { storyPreviewId } from "@fwoosh/types";
import { getConfig as getFwooshConfig } from "@fwoosh/types";

import { BenchLayout } from "../../components/BenchLayout";
import { getAllStorySlugs, getStoryBySlug } from "../../utils/stories";

import * as stylex from "@stylexjs/stylex";
import { importPlugin } from "@fwoosh/pages";

const styles = stylex.create({
  iframe: {
    display: "flex",
    height: "100%",
    width: "100%",
  },
});

export default async function Story({ storySlug }: { storySlug: string }) {
  const { page, story } = await getStoryBySlug(storySlug);
  const wrappers = await getFwooshConfig().then(({ plugins = [] }) =>
    plugins
      .map(({ tools = [] }) => tools)
      .flat()
      .filter((plugin) => plugin.type === "frame-wrapper")
  );

  let frame = (
    <iframe
      id={storyPreviewId}
      src={`/iframe/${storySlug}`}
      {...stylex.props(styles.iframe)}
      style={{ border: "none" }}
    />
  );

  if (wrappers.length !== 0) {
    const decoratorComponents = await Promise.all(
      wrappers.map(({ filepath }) => importPlugin(filepath))
    );

    frame = decoratorComponents.reduceRight((acc, Wrapper, index) => {
      const wrapper = wrappers[index]!;
      return <Wrapper key={wrapper.id}>{acc}</Wrapper>;
    }, frame);
  }

  return (
    <BenchLayout page={page} story={story}>
      {frame}
    </BenchLayout>
  );
}

export const getConfig = async () => {
  return {
    render: "static",
    staticPaths: await getAllStorySlugs(),
  };
};
