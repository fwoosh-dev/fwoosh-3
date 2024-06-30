declare module "@fwoosh/pages" {
  import { DummyMeta, FwooshPluginProps } from "@fwoosh/types";

  export function importPage(filename: string): Promise<{
    [key: string]: () => JSX.Element;
  }>;

  export function importMeta(filename: string): Promise<{
    meta: DummyMeta;
    [key: string]: {
      (): JSX.Element;
      options?: object;
    };
  }>;

  export function importPlugin<T>(
    filename: string
  ): Promise<
    (
      props: Required<FwooshPluginProps<T>> & { children?: React.ReactNode }
    ) => JSX.Element
  >;
}
