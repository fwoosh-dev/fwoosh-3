import { Story } from "../utils/stories";

async function DocExample({ story, name }: { story: Story; name: string }) {
  /* @vite-ignore */
  const mod = await import(story.file);
  const Example = mod[name];

  return <Example />;
}

export async function Doc({ story }: { story: Story }) {
  if (!story.stories.length) {
    return <div>No examples found</div>;
  }

  return (
    <div>
      <h1>{story.title}</h1>
      <p>{story.description}</p>

      {story.stories.map(({ name, description }) => (
        <div key={name}>
          <h2>{name}</h2>
          <p>{description}</p>
          <DocExample story={story} name={name} />
        </div>
      ))}
    </div>
  );
}
