# Fwoosh

A faster, lighter, easier, more themeable storybook.

## Development

First install the deps and run the build.

```bash
pnpm install
pnpm build
```

Then run the dev server for the example.

```bash
cd examples/react
pnpm fwoosh dev
```

Then navigate to http://localhost:3000/bench

### Naman

In `packages/fwoosh/src/components/BenchLayout.tsx` we import `@fwoosh/ui/colors`.
It return the following error.
All that file does is call `stylex.defineVars` a bunch.

```txt
11:13:48 PM [vite] Error when evaluating SSR module /src/pages/bench/[storySlug].tsx: failed to import "/src/components/BenchLayout.tsx"
|- Error: /Users/andrewlisowski/Documents/fwoosh-3/packages/fwoosh/src/components/BenchLayout.tsx: Only static values are allowed inside of a stylex.create() call.
    at transformStyleXCreate (/Users/andrewlisowski/Documents/fwoosh-3/node_modules/.pnpm/@stylexjs+babel-plugin@0.6.1/node_modules/@stylexjs/babel-plugin/lib/index.js:4324:13)
```

## TODO

- [ ] build mode
