"use client";

import { Meta } from "fwoosh";
import { Button } from "./Button";

export const meta: Meta = {
  title: "Components/Button",
  component: Button,
  description: "A button is something that can be clicked",
};

/** Use a button to trigger an action */
export const Primary = () => <Button>Click me</Button>;

/** A button can be disabled */
export const Disabled = () => <Button disabled>Disabled</Button>;
