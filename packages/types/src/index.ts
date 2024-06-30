import type { BundledTheme } from "shiki/themes";
import { UnionToIntersection } from "type-fest";

interface FwooshToolBase<Options extends object = object> {
  id: string;
  filepath: string;
  options?: Options;
  // TODO: add something like "params" so a tool can be configured with different parameters
  // for pages and stories
  // paramKey?: string;
}

export interface FwooshToolbarButton extends FwooshToolBase {
  type: "toolbar";
  scope: "story" | "global" | "docs";
}

export interface FwooshPanel extends FwooshToolBase {
  type: "panel";
  panelTitle?: string;
}

export interface FwooshDecorator extends FwooshToolBase {
  type: "decorator";
}

export interface PanelWrapper extends FwooshToolBase {
  type: "frame-wrapper";
}

export type FwooshTool =
  | FwooshToolbarButton
  | FwooshPanel
  | FwooshDecorator
  | PanelWrapper;

export interface FwooshPluginConfig {
  tools?: FwooshTool[];
}

interface GrayTheme {
  chrome: "gray";
  primary: "bronze" | "gold" | "brown" | "orange" | "tomato" | "red" | "ruby";
}

interface MauveTheme {
  chrome: "mauve";
  primary:
    | "tomato"
    | "red"
    | "ruby"
    | "crimson"
    | "pink"
    | "plum"
    | "purple"
    | "violet";
}

interface SlateTheme {
  chrome: "slate";
  primary: "iris" | "indigo" | "blue" | "sky" | "cyan";
}

interface SageTheme {
  chrome: "sage";
  primary: "mint" | "teal" | "jade" | "green";
}

interface OliveTheme {
  chrome: "olive";
  primary: "grass" | "lime";
}

interface SandTheme {
  chrome: "sand";
  primary: "yellow" | "amber" | "orange" | "brown";
}

type AppTheme =
  | GrayTheme
  | MauveTheme
  | SlateTheme
  | SageTheme
  | OliveTheme
  | SandTheme;

interface CodeTheme {
  light?: BundledTheme;
  dark?: BundledTheme;
}

export interface FwooshConfig<
  Plugins extends FwooshPluginConfig[] = FwooshPluginConfig[]
> {
  /** The name of the project */
  name: string;
  /** The logo to display in the sidebar */
  logo?: string;
  /** A list of files to consider for docgen */
  docgen: string[];
  /** The output directory for the build */
  out?: string;
  /** A list of plugins that add tools to fwoosh */
  plugins?: Plugins;
  /** Theme the colors of the app */
  theme?: AppTheme & { code?: CodeTheme };
}

export const defaultConfig = {
  name: "Fwoosh",
  docgen: ["**/*.stories.tsx"],
  out: "out",
  plugins: [],
  theme: {
    chrome: "mauve",
    primary: "pink",
    code: {
      light: "github-light",
      dark: "github-dark",
    },
  },
} satisfies FwooshConfig;

type PluginOptions<T extends FwooshConfig> = T extends FwooshConfig<infer P>
  ? P[number]["tools"] extends Array<infer C>
    ? C extends FwooshTool
      ? Partial<Record<C["id"], C["options"]>>
      : never
    : never
  : never;

export type MetaOf<T extends FwooshConfig> = {
  options?: UnionToIntersection<PluginOptions<T>>;
};

export type StoryMetaOf<T extends FwooshConfig> = {
  options?: MetaOf<T>["options"];
};

export interface Story {
  id: string;
  name: string;
  description?: string;
}

export interface Page {
  group: string;
  id: string;
  file: string;
  title: string;
  description?: string;
  stories: Story[];
}

export interface StoryContext {
  page: Page;
  story: Story;
}

export interface FwooshPluginProps<T> extends StoryContext {
  options?: T | undefined;
}

export interface Meta<T = object> {
  /** The title of the stories. This is used to created the sidebar. */
  title: string;
  /** The component to generate documentation for. This can be a single component or an array of components. */
  component?: T | T[];
  /** A top level description for the component. */
  description?: string;
}

export type DummyMeta = Meta<object> & {
  options?: object;
};

// We add extra properties to the component so that we can
// use the component in the story context
interface RuntimeComponent {
  fwoosh_file: string;
  displayName: string;
}

export type RuntimeMeta = Meta<RuntimeComponent>;

export const storyPreviewId = "story-preview";
export { getConfig } from "./config.js";

export interface StoryMeta {
  /** An alternative name for the story */
  displayName?: string;
}

export function getStorySlug(page: Page, story: Story) {
  return `${page.id}_${story.id}`;
}
