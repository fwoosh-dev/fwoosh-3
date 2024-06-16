import { Page } from "../utils/stories";

async function DocExample({ page, name }: { page: Page; name: string }) {
  /* @vite-ignore */
  const mod = await import(/* @vite-ignore */ page.file);
  const Example = mod[name];

  return <Example />;
}

export async function Doc({ page }: { page: Page }) {
  if (!page.stories.length) {
    return <div>No examples found</div>;
  }

  return (
    <div>
      <h1>{page.title}</h1>
      <p>{page.description}</p>

      {page.stories.map(({ name, description }) => (
        <div key={name}>
          <h2>{name}</h2>
          <p>{description}</p>
          <DocExample page={page} name={name} />
        </div>
      ))}
    </div>
  );
}
