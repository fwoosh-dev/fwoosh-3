import { glob } from "glob";
import { promises as fs } from "fs";
import { kebabCase } from "change-case";
import { Page, Story } from "@fwoosh/types";
import { extractComments } from "@fwoosh/extract-comments";

export const getAllPageGroups = async (): Promise<Record<string, Page[]>> => {
  const files = await glob(`${process.env.TARGET_DIRECTORY}/**/*.stories.tsx`);
  const stories = await Promise.all(
    files.map(async (file) => {
      const fileTitle = file.replace(/\.stories\.tsx$/, "");

      let {
        meta,
        title: pageTitle,
        ...stories
      } = await import(/* @vite-ignore */ `/fwoosh-meta?file=${file}`);

      const contents = await fs.readFile(file, "utf-8");
      const comments = extractComments(contents);
      const storyToComment = comments.reduce((acc, comment) => {
        return {
          ...acc,
          [comment.entity]: comment.comment,
        };
      }, {} as Record<string, string>);

      const id = meta?.title ?? fileTitle;
      let [group, title] = id.includes("/") ? id.split("/") : [, id];

      return {
        group,
        id: kebabCase(id),
        file,
        title,
        description: meta?.description,
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

export async function getStoryBySlug(slug: string) {
  const { name, key } = parseStorySlug(slug);

  if (!name || !key) {
    throw new Error("Invalid slug");
  }

  const page = await getPageById(name);

  if (!page) {
    throw new Error(`Page not found: ${slug}`);
  }

  const story = page.stories.find((s) => s.id === key);

  if (!story) {
    throw new Error("Story not found");
  }

  return { page, story };
}
