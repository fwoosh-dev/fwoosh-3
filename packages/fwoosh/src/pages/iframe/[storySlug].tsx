import { importMeta, importPage, importPlugin } from "@fwoosh/pages";
import { getAllStorySlugs, getStoryBySlug } from "../../utils/stories";
import { getConfig as getFwooshConfig } from "@fwoosh/types";
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

    const { meta, ...stories } = await importMeta(page.file);
    const decorators = await getFwooshConfig().then(({ plugins = [] }) =>
      plugins
        .map(({ tools = [] }) => tools)
        .flat()
        .filter((plugin) => plugin.type === "decorator")
    );

    let example = <Example />;

    if (decorators.length !== 0) {
      const decoratorComponents = await Promise.all(
        decorators.map(({ filepath }) => importPlugin(filepath))
      );

      example = decoratorComponents.reduceRight((acc, Decorator, index) => {
        const decorator = decorators[index]!;
        const globalDecoratorOptions = decorator.options;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pageLevelDecoratorOptions = (meta?.options as any)?.[
          decorator.id
        ] as object | undefined;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const storyLevelDecoratorOptions = (stories[story.name] as any).story
          ?.options?.[decorator.id];

        return (
          <Decorator
            key={decorator.id}
            options={{
              ...globalDecoratorOptions,
              ...pageLevelDecoratorOptions,
              ...storyLevelDecoratorOptions,
            }}
          >
            {acc}
          </Decorator>
        );
      }, example);
    }

    return <div {...stylex.props(styles.base)}>{example}</div>;
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
