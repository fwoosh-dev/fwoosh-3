import { Link } from "waku";
import { getAllStories, getStorySlug } from "../utils/stories";

export async function StoryList() {
  const data = await getAllStories();

  return (
    <ul>
      {data.map(({ title, stories }) => (
        <li key={title}>
          <div>{title}</div>

          <ul>
            {stories.map((story) => (
              <li key={story}>
                <Link to={`/bench/${getStorySlug(title, story)}`}>{story}</Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
