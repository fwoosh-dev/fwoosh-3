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

type Component = {} & {
  fwoosh_file: string;
  displayName: string;
};

export interface Meta {
  title: string;
  component?: Component | Component[];
}

export const storyPreviewId = "story-preview";
