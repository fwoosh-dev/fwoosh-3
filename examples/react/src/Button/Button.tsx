export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The size of the button */
  size?: "small" | "medium" | "large";
  /** The type of button */
  variant?: "primary" | "secondary" | "tertiary";
}

/** A button */
export const Button = (props: ButtonProps) => {
  return <button style={{ background: "blue", color: "white" }} {...props} />;
};
