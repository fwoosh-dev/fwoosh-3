import { createRequire } from "module";

//@ts-ignore
const require = createRequire(import.meta.url);

export const resolveFile = require.resolve;
