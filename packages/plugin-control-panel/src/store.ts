import { Control } from "./types.js";

export function setItem<T>({
  id,
  value,
  scope,
}: {
  id: string;
  value: Control<T>;
  scope: "iframe" | "app";
}) {
  const current = JSON.parse(localStorage.getItem(id) || "{}");

  localStorage.setItem(
    id,
    JSON.stringify({
      ...current,
      [value.label]: value,
    })
  );

  if (scope === "iframe") {
    window.parent.document.dispatchEvent(new CustomEvent("controls-updated"));
  } else {
    document
      .querySelector("iframe")
      ?.contentWindow?.postMessage("update-controls");
  }
}
