"use client";

import { Select, SelectOption } from "@fwoosh/ui/components/Select";
import { IconButton } from "@fwoosh/ui/components/IconButton";
import { useValue } from "tinybase/ui-react";
import { MobileIcon } from "@radix-ui/react-icons";
import { Tooltip, TooltipTrigger } from "@fwoosh/ui/components/Tooltip";

import { sizes } from "./sizes.js";
import { canUseOrientation, store } from "./store.js";

export default function ScreensTool() {
  const device = useValue("device", store);
  const orientation = useValue("orientation", store);

  return (
    <>
      <Select
        variant="toolbar"
        placeholder="Default"
        selectedKey={typeof device === "string" ? device : "default"}
        onSelectionChange={(key) => store.setValue("device", key)}
      >
        <SelectOption id="default">Default</SelectOption>
        {Object.entries(sizes).map((item) => (
          <SelectOption id={item[0]}>{item[0]}</SelectOption>
        ))}
      </Select>

      {canUseOrientation(device) && (
        <TooltipTrigger>
          <IconButton
            variant="toolbar"
            onPress={() =>
              store.setValue(
                "orientation",
                orientation === "portrait" ? "landscape" : "portrait"
              )
            }
          >
            <MobileIcon
              style={{
                transform: `rotate(${orientation === "portrait" ? 0 : 90}deg)`,
              }}
            />
          </IconButton>
          <Tooltip>
            {orientation === "portrait" ? "Landscape" : "Portrait"}
          </Tooltip>
        </TooltipTrigger>
      )}
    </>
  );
}
