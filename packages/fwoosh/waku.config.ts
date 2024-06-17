import path from "path";

const config = {
  distDir: path.relative(
    process.cwd(),
    process.env.OUTPUT_DIRECTORY || "./out"
  ),
};

console.log("DIST DIR", config.distDir);

export default config;
