import { Link } from "waku";
import { getAllStories, getDocSlug } from "../utils/stories";

export async function DocList() {
  const data = await getAllStories();

  return (
    <ul>
      {data.map(({ title }) => (
        <li key={title}>
          <Link to={`/docs/${getDocSlug(title)}`}>{title}</Link>
        </li>
      ))}
    </ul>
  );
}
