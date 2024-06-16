interface FwooshToolBase {
  id: string;
  filepath: string;
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

export type FwooshTool = FwooshToolbarButton | FwooshPanel;

export interface FwooshPluginConfig {
  tools?: FwooshTool[];
}

export interface FwooshConfig {
  docgen: string[];
  plugins?: FwooshPluginConfig[];
}

export interface Story {
  id: string;
  name: string;
  description?: string;
}

export interface Page {
  group: any;
  id: string;
  file: string;
  title: any;
  description?: any;
  stories: Story[];
}

export interface StoryContext {
  page: Page;
  story: Story;
}

export interface Meta<T = Object> {
  /** The title of the stories. This is used to created the sidebar. */
  title: string;
  /** The component to generate documentation for. This can be a single component or an array of components. */
  component?: T | T[];
  /** A top level description for the component. */
  description?: string;
}

// We add extra properties to the component so that we can
// use the component in the story context
type RuntimeComponent = {} & {
  fwoosh_file: string;
  displayName: string;
};

export type RuntimeMeta = Meta<RuntimeComponent>;

export const storyPreviewId = "story-preview";
