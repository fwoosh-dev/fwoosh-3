import { Link } from "waku";
import { getAllPageGroups } from "../utils/stories";

export async function DocList() {
  const data = await getAllPageGroups();

  return (
    <ul>
      {Object.entries(data).map(([group, pages]) => (
        <li key={group}>
          <h2>{group}</h2>
          <ul>
            {pages.map(({ title, id }) => (
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
