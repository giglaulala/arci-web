import projects from "../../content/projects.json";
import site from "../../content/site.json";
import timeline from "../../content/timeline.json";
import type { Project, SiteConfig, TimelineEntry } from "@/types/content";

export function getSiteConfig() {
  return site as SiteConfig;
}

export function getProjects() {
  return projects as Project[];
}

export function getTimeline() {
  return timeline as TimelineEntry[];
}
