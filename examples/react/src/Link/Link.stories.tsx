import { Meta } from "fwoosh";
import { Link } from "./Link";

export const meta: Meta = {
  title: "Components/Link",
  component: Link,
  description: "A link to an external page",
};

export const Primary = () => <Link>Click me</Link>;
