import { Button } from "./Button";

export default {
  title: "My Button",
  component: Button,
};

export const Primary = () => <Button>Click me</Button>;

export const Disabled = () => <Button disabled>Disabled</Button>;
