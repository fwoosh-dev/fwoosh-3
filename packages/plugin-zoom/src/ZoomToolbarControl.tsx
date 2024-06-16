"use client";

// import { useCallback, useEffect, useState } from "react";
// import { storyPreviewId } from "@fwoosh/types";

// function browserSupportsCssZoom(): boolean {
//   try {
//     return (
//       // @ts-expect-error (we're testing for browser support)
//       global.document.implementation.createHTMLDocument("").body.style.zoom !==
//       undefined
//     );
//   } catch (error) {
//     return false;
//   }
// }

// const hasBrowserSupportForCssZoom = browserSupportsCssZoom();

export default function ZoomToolbarControl() {
  // const [zoom, zoomSet] = useState(100);
  // // const zoomInLabel = "Zoom in";
  // // const zoomOutLabel = "Zoom out";
  // // const zoomResetLabel = "Reset zoom";

  // const increaseZoom = useCallback(() => {
  //   zoomSet((z) => z * 1.2);
  // }, []);

  // const decreaseZoom = useCallback(() => {
  //   zoomSet((z) => z * 0.8);
  // }, []);

  // const resetZoom = useCallback(() => {
  //   zoomSet(100);
  // }, []);

  // useEffect(() => {
  //   const storyPreview = document.getElementById(storyPreviewId);

  //   if (storyPreview) {
  //     if (hasBrowserSupportForCssZoom) {
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       (storyPreview.style as any).zoom = `${zoom / 100}`;
  //     } else {
  //       storyPreview.style.transformOrigin = "top left";

  //       if (zoom === 100) {
  //         storyPreview.style.transform = "none";
  //       } else {
  //         storyPreview.style.transform = `scale(${zoom / 100})`;
  //       }
  //     }
  //   }
  // }, [storyPreviewId, zoom]);

  return (
    <>
      <button>+</button>
      <button>-</button>
      <button>Reset</button>
    </>
  );
}
