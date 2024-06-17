import path from "path";

export const resolveFile = (filename: string) => {
  const dummyError = new Error("Not implemented");
  const parentInStack = (dummyError.stack || "").split("\n")[2];
  const [, parentFilePath = ""] =
    (parentInStack || "").match(/at \S*\s*\((?:file:\/\/)*([^:]*)/) || [];

  if (!parentFilePath) {
    throw new Error("Could not find parent file path");
  }

  return path.join(path.dirname(parentFilePath), filename);
};
