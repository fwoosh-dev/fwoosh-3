import { PageMeta } from "fwoosh";
import { Link } from "./Link.js";

export const meta: PageMeta = {
  title: "Components/Link",
  component: Link,
  description: "A link to an external page",
  options: {
    centered: {
      enabled: false,
    },
  },
};

export const Primary = () => <Link>Click me</Link>;
