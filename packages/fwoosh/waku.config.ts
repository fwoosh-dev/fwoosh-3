import path from "path";

const config = {
  distDir: path.relative(
    process.cwd(),
    process.env.OUTPUT_DIRECTORY || "./out"
  ),
};

export default config;
