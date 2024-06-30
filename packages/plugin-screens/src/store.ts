import { ValueOrUndefined, createStore } from "tinybase";

export const store = createStore()
  .setValue("device", "default")
  .setValue("orientation", "portrait");

export function canUseOrientation(device: ValueOrUndefined) {
  return (
    device &&
    device !== "default" &&
    device.toString().indexOf("Desktop") === -1
  );
}
