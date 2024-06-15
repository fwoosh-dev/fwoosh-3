import { Link } from "waku";
import { getAllStories, getStorySlug } from "../utils/stories";

export async function StoryList() {
  const data = await getAllStories();

  return (
    <ul>
      {Object.entries(data).map(([group, stories]) => (
        <li key={group}>
          <h2>{group}</h2>
          <ul>
            {stories.map(({ title, stories }) => (
              <li key={title}>
                <div>{title}</div>

                <ul>
                  {stories.map(({ name }) => (
                    <li key={name}>
                      <Link to={`/bench/${getStorySlug(title, name)}`}>
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
