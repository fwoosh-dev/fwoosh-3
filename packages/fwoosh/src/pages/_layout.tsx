import "../styles.css";

import type { ReactNode } from "react";
import { StoryHMRDetector } from "../components/StoryHMRDetector";

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="font-['Nunito']">
      {children}
      <StoryHMRDetector />
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: "static",
  };
};
