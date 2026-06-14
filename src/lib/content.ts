import home from "../../content/home.json";
import projects from "../../content/projects.json";
import site from "../../content/site.json";
import timeline from "../../content/timeline.json";
import type { Project, SiteConfig, TimelineEntry } from "@/types/content";
import type { HomeContent } from "@/types/home";

export function getSiteConfig() {
  return site as SiteConfig;
}

export function getHomeContent() {
  return home as HomeContent;
}

export function getProjects() {
  return projects as Project[];
}

export function getTimeline() {
  return timeline as TimelineEntry[];
}
