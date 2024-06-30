import { glob } from "glob";
import { promises as fs } from "fs";
import crypto from "crypto";
import { Page, getStorySlug } from "@fwoosh/types";
import { extractComments } from "@fwoosh/extract-comments";
import { importMeta, importPage } from "@fwoosh/pages";

const changeCasePromise = import("change-case");

export async function getAllPages() {
  return glob(`${process.env.TARGET_DIRECTORY}/**/*.stories.tsx`);
}

const cache = new Map<string, Page>();

async function calculateChecksum(filePath: string) {
  const fileBuffer = await fs.readFile(filePath);
  const hash = crypto.createHash("sha256");
  hash.update(fileBuffer);
  const checksum = hash.digest("hex");
  return checksum;
}

export const getAllPageGroups = async (): Promise<Record<string, Page[]>> => {
  const { kebabCase } = await changeCasePromise;
  const files = await getAllPages();
  const stories = await Promise.all(
    files.map(async (file) => {
      const checksum = await calculateChecksum(file);
      const cached = cache.get(checksum);

      if (cached) {
        return cached;
      }

      const fileTitle = file.replace(/\.stories\.tsx$/, "");
      const { meta: _, ...stories } = await importPage(file);
      const { meta } = await importMeta(file);
      const contents = await fs.readFile(file, "utf-8");
      const comments = extractComments(contents);
      const storyToComment = comments.reduce((acc, comment) => {
        return {
          ...acc,
          [comment.entity]: comment.comment,
        };
      }, {} as Record<string, string>);

      const id = meta?.title ?? fileTitle;
      const [group, title] = id.includes("/") ? id.split("/") : ["", id];

      const page = {
        group: group as string,
        id: kebabCase(id),
        file,
        title: title as string,
        description: meta?.description,
        stories: Object.keys(stories).map((item) => ({
          id: kebabCase(item),
          name: item,
          description: storyToComment[item],
        })),
      };

      cache.set(checksum, page);
      return page;
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

export const getAllStorySlugs = async (): Promise<string[]> => {
  const data = await getAllPageGroups();

  return Object.values(data)
    .flat()
    .map((page) => page.stories.map((story) => getStorySlug(page, story)))
    .flat();
};

export async function getPageById(id: string) {
  const allStories = await getAllPageGroups();

  for (const story of Object.values(allStories).flat()) {
    if (story.id === id) {
      return story;
    }
  }
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
