export interface TextControl<T> {
  label: string;
  value: T;
  type: "text";
}

export interface NumberControl<T> {
  label: string;
  value: T;
  type: "number";
  min?: number;
  max?: number;
}

export interface SelectControl<T> {
  label: string;
  value: NoInfer<T>;
  type: "select";
  options: T[];
}

export type Control<T> = TextControl<T> | SelectControl<T> | NumberControl<T>;
