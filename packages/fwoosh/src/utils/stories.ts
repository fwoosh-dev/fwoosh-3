import { glob } from "glob";
import { promises as fs } from "fs";
import { kebabCase } from "change-case";
import extract from "multilang-extract-comments";

export const getAllStories = async () => {
  const files = await glob(`${process.env.TARGET_DIRECTORY}/**/*.stories.tsx`);
  const stories = await Promise.all(
    files.map(async (file) => {
      const title = file.replace(/\.stories\.tsx$/, "");
      /* @vite-ignore */
      const { default: storyMeta, ...stories } = await import(file);
      const contents = await fs.readFile(file, "utf-8");
      const comments = Object.values(extract(contents));
      const storyToComment = comments.reduce((acc, comment) => {
        const storyName = comment.code.match(/export const (.*?)\s/)?.[1];

        return {
          ...acc,
          ...(storyName && { [storyName]: comment.content }),
        };
      }, {} as Record<string, string>);

      const id = storyMeta?.title ?? title;

      return {
        id: kebabCase(id),
        file,
        title: id,
        description: storyMeta?.description,
        stories: Object.keys(stories).map((item) => ({
          name: item,
          description: storyToComment[item],
        })),
      };
    })
  );

  return stories.sort((a, b) => a.title.localeCompare(b.title));
};

export async function getStoryById(id: string) {
  return getAllStories().then((stories) =>
    stories.find((story) => story.id === id)
  );
}

export type Story = Awaited<ReturnType<typeof getAllStories>>[number];

export function getStorySlug(name: string, key: string) {
  return `${kebabCase(name)}_${key}`;
}

export function getDocSlug(name: string) {
  return `${kebabCase(name)}`;
}

export function parseStorySlug(slug: string) {
  const [name, key] = slug.split("_");

  return {
    name,
    key,
  };
}
