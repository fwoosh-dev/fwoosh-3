export interface TextControl<T> {
  label: string;
  value: T;
  type: "text";
}

export interface SelectControl<T> {
  label: string;
  value: T;
  type: "select";
  options: T[];
}

export type Control<T> = TextControl<T> | SelectControl<T>;
