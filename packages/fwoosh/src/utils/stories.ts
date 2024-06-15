import { glob } from "glob";
import { promises as fs } from "fs";
import { kebabCase } from "change-case";
// import extract from "multilang-extract-comments";

export const getAllPageGroups = async () => {
  const files = await glob(`${process.env.TARGET_DIRECTORY}/**/*.stories.tsx`);
  const stories = await Promise.all(
    files.map(async (file) => {
      const fileTitle = file.replace(/\.stories\.tsx$/, "");
      /* @vite-ignore */
      const { default: storyMeta, ...stories } = await import(file);
      const contents = await fs.readFile(file, "utf-8");
      const comments: any[] = []; //Object.values(extract(contents));
      const storyToComment = comments.reduce((acc, comment) => {
        const storyName = comment.code.match(/export const (.*?)\s/)?.[1];

        return {
          ...acc,
          ...(storyName && { [storyName]: comment.content }),
        };
      }, {} as Record<string, string>);

      const id = storyMeta?.title ?? fileTitle;
      let [group, title] = id.includes("/") ? id.split("/") : [, id];

      return {
        group,
        id: kebabCase(id),
        file,
        title,
        description: storyMeta?.description,
        stories: Object.keys(stories).map((item) => ({
          id: kebabCase(item),
          name: item,
          description: storyToComment[item],
        })),
      };
    })
  );

  const groupedStories = stories.reduce((acc, story) => {
    const { group = "", id } = story;
    let grouping = acc[group];

    if (!grouping) {
      grouping = [];
      acc[group] = grouping;
    }

    grouping.push({
      ...story,
      id,
    });

    return acc;
  }, {} as Record<string, (typeof stories)[number][]>);

  return Object.fromEntries(
    Object.entries(groupedStories)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([group, contents]) => [
        group,
        contents.sort((a, b) => a.title.localeCompare(b.title)),
      ])
  );
};

export async function getPageById(id: string) {
  const allStories = await getAllPageGroups();

  for (const story of Object.values(allStories).flat()) {
    if (story.id === id) {
      return story;
    }
  }
}

export type Page = Awaited<ReturnType<typeof getAllPageGroups>>[string][number];
export type Story = Page["stories"][number];

export function getStorySlug(page: Page, story: Story) {
  return `${page.id}_${story.id}`;
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
