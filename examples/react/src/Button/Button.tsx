export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The size of the button */
  size?: "small" | "medium" | "large";
  /**
   * The type of button. Add some _style_ to it.
   * @default primary
   */
  variant?: "primary" | "secondary" | "tertiary";
}

/**
 * A button
 *
 * Can even have examples:
 *
 * ```tsx
 * <Button>Even code</Button>
 * ```
 */
export const Button = (props: ButtonProps) => {
  return (
    <button style={{ backgroundColor: "blue", color: "white" }} {...props} />
  );
};
