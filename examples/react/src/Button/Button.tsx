export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The size of the button */
  size?: "small" | "medium" | "large";
  /**
   * The type of button
   * @default primary
   */
  variant?: "primary" | "secondary" | "tertiary";
}

/** A button */
export const Button = (props: ButtonProps) => {
  return (
    <button style={{ backgroundColor: "blue", color: "white" }} {...props} />
  );
};
