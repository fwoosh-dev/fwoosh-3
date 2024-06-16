import path from "path";
import { Meta } from "./index.js";

export const resolveFile = (filename: string) => {
  const dummyError = new Error("Not implemented");
  const parentInStack = (dummyError.stack || "").split("\n")[2];
  const [, parentFilePath = ""] =
    (parentInStack || "").match(/at \S*\s*\(([^:]*)/) || [];

  if (!parentFilePath) {
    throw new Error("Could not find parent file path");
  }

  return path.join(path.dirname(parentFilePath), filename);
};

export async function getMeta(filename: string) {
  const { meta } = (await import(
    /* @vite-ignore */ `/fwoosh-meta?file=${filename}`
  )) as { meta: Meta };

  if (!meta) {
    throw new Error("Could not find meta");
  }

  return meta;
}
