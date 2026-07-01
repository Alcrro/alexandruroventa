import React from "react";
import { Composition } from "remotion";
import { ProjectsFlow } from "./ProjectsFlow";
import { ProjectsFlowVertical } from "./ProjectsFlowVertical";
import { ProjectsScript } from "./ProjectsScript";
import { ClientSideFlow } from "./ClientSideFlow";

export const Root = () => (
  <>
    {/* LinkedIn / Twitter / YouTube — 16:9 landscape */}
    <Composition
      id="ProjectsFlow"
      component={ProjectsFlow}
      durationInFrames={1290}
      fps={30}
      width={1280}
      height={720}
    />

    {/* TikTok / Instagram Reels / YouTube Shorts — 9:16 vertical */}
    <Composition
      id="ProjectsFlowVertical"
      component={ProjectsFlowVertical}
      durationInFrames={1290}
      fps={30}
      width={1080}
      height={1920}
    />
    {/* Script — text slides, LinkedIn/Twitter — 16:9 */}
    <Composition
      id="ProjectsScript"
      component={ProjectsScript}
      durationInFrames={1200}
      fps={30}
      width={1280}
      height={720}
    />

    {/* Script — text slides, TikTok/Reels/Shorts — 9:16 */}
    <Composition
      id="ProjectsScriptVertical"
      component={ProjectsScript}
      durationInFrames={1200}
      fps={30}
      width={1080}
      height={1920}
    />
    {/* Sequence diagram — Server Component vs Client Component, 24s */}
    <Composition
      id="ClientSideFlow"
      component={ClientSideFlow}
      durationInFrames={720}
      fps={30}
      width={1280}
      height={720}
    />
  </>
);
