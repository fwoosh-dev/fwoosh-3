import { FwooshConfig, Meta, MetaOf } from "@fwoosh/types";

export * from "@fwoosh/types";

export function defineConfig<T extends FwooshConfig>(config: T) {
  return config as unknown as MetaOf<T> & Meta;
}
