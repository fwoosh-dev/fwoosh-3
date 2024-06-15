import { Link } from "waku";
import { getAllPageGroups, getStorySlug } from "../utils/stories";

export async function StoryList() {
  const groups = await getAllPageGroups();

  return (
    <ul>
      {Object.entries(groups).map(([group, pages]) => (
        <li key={group}>
          <h2>{group}</h2>
          <ul>
            {pages.map((page) => (
              <li key={page.title}>
                <div>{page.title}</div>

                <ul>
                  {page.stories.map((story) => (
                    <li key={story.name}>
                      <Link to={`/bench/${getStorySlug(page, story)}`}>
                        {story.name}
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
