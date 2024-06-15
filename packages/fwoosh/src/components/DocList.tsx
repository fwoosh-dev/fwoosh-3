import { Link } from "waku";
import { getAllStories } from "../utils/stories";

export async function DocList() {
  const data = await getAllStories();

  return (
    <ul>
      {Object.entries(data).map(([group, stories]) => (
        <li key={group}>
          <h2>{group}</h2>
          <ul>
            {stories.map(({ title, id }) => (
              <li key={id}>
                <Link to={`/docs/${id}`}>{title}</Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
