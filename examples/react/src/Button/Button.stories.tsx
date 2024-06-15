import { Button } from "./Button";

export default {
  title: "My Button",
  component: Button,
  description: "A button",
};

/** Use a button to trigger an action */
export const Primary = () => <Button>Click me</Button>;

/** A button can be disabled */
export const Disabled = () => <Button disabled>Disabled</Button>;
