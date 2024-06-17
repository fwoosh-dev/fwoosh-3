import path from "path";

export async function getProdMetaCache() {
  const findCacheDirectoryPromise = import("find-cache-dir");
  const cacheDir = (await findCacheDirectoryPromise).default({
    name: "fwoosh",
    create: true,
  });

  if (!cacheDir) {
    throw new Error("Could not find fwoosh cache directory");
  }

  return path.join(cacheDir, "fwoosh.meta.json");
}
