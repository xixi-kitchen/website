import type { Project } from "@/data/projects";
import { resolveLocale } from "./useI18n";

const cards: Record<string, Pick<Project, "title" | "description" | "tags">> = {
  "app-3-upgrade": {
    title: "APP 3.0 Upgrade",
    description: "A full upgrade of the app, from plan and design through development and release.",
    tags: ["Product", "Upgrade", "Experience"],
  },
  "ui-refresh": {
    title: "Interface Refresh",
    description: "Redesigned most of the app’s screens so the interface reads as one product.",
    tags: ["UI", "Experience", "Brand"],
  },
  "family-account": {
    title: "Family Account",
    description: "A family account for managing devices and member permissions.",
    tags: ["Accounts", "Security", "Experience"],
  },
  roommap: {
    title: "RoomMap",
    description: "A visual map for managing rooms and devices in a home.",
    tags: ["Smart home", "Interaction", "Experience"],
  },
  "qq-music": {
    title: "QQ Music",
    description: "QQ Music brought into the product.",
    tags: ["Integration", "Music", "Experience"],
  },
  "data-metrics": {
    title: "Product Metrics",
    description: "A metrics system for product decisions.",
    tags: ["Data", "Metrics", "Product"],
  },
  "oem-customization": {
    title: "OEM Customization",
    description: "Custom software builds for OEM partners.",
    tags: ["OEM", "Delivery", "Product"],
  },
  "device-integration": {
    title: "Device Integration",
    description: "Third-party devices connected into the product.",
    tags: ["Devices", "Integration", "IoT"],
  },
  "futong-business-system": {
    title: "Futong Cloud",
    description: "A business system for the Futong cloud platform.",
    tags: ["SaaS", "B2B", "Product"],
  },
  "lead-scoring": {
    title: "Lead Scoring",
    description: "Scoring for customers in the open pool.",
    tags: ["CRM", "Scoring", "Data"],
  },
  "global-buyers": {
    title: "Global Buyers",
    description: "A rebuild of the global buyers section.",
    tags: ["B2B", "Information architecture", "Experience"],
  },
  "email-module": {
    title: "Email Module",
    description: "A clearer, faster email module.",
    tags: ["Email", "Workflow", "Experience"],
  },
  "visual-identity": {
    title: "Visual Identity",
    description: "A company-wide visual system, delivered with DGI.",
    tags: ["Identity", "Brand", "Direction"],
  },
};

export function localizeProject(project: Project, locale?: string): Project {
  if (resolveLocale(locale) !== "en") return project;
  const full = project.i18n?.en;
  const card = cards[project.slug];
  return {
    ...project,
    title: full?.title ?? card?.title ?? project.title,
    description: full?.description ?? card?.description ?? project.description,
    tags: full?.tags ?? card?.tags ?? project.tags,
    role: full?.role ?? project.role,
    status: full?.status ?? project.status,
    tools: full?.tools ?? project.tools,
    steps: full?.steps ?? project.steps,
    projectInfo: full?.projectInfo ?? project.projectInfo,
    features: full?.features ?? project.features,
    achievements: full?.achievements ?? project.achievements,
    changelog: full?.changelog ?? project.changelog,
  };
}
