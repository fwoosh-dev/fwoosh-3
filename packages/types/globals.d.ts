declare module "@fwoosh/pages" {
  import { RuntimeMeta, StoryContext, FwooshPluginProps } from "@fwoosh/types";

  export function importPage(filename: string): Promise<{
    [key: string]: () => JSX.Element;
  }>;

  export function importMeta(filename: string): Promise<RuntimeMeta>;

  export function importPlugin(
    filename: string
  ): Promise<(props: FwooshPluginProps) => JSX.Element>;
}
