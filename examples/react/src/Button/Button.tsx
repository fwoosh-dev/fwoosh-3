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
export const Button = ({ size, ...props }: ButtonProps) => {
  return (
    <button
      style={{
        backgroundColor: "blue",
        color: "white",
        padding:
          size === "small"
            ? "4px 8px"
            : size === "medium"
            ? "8px 16px"
            : "16px 24px",
      }}
      {...props}
    />
  );
};
