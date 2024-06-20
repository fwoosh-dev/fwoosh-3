// TODO: move this to bench/ and docs/ so the styles don't
// affect anything in the iframe/
import "inter-ui/inter-latin.css";
import "../styles.css";
import "@stylex-dev.css";

import type { ReactNode } from "react";
import { StoryHMRDetector } from "../components/StoryHMRDetector";

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      {children}
      <StoryHMRDetector />
    </>
  );
}

export const getConfig = async () => {
  return {
    render: "static",
  };
};
