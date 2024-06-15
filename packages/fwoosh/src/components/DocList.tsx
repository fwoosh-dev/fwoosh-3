import { Link } from "waku";
import { getAllPageGroups } from "../utils/stories";

export async function DocList() {
  const data = await getAllPageGroups();

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
