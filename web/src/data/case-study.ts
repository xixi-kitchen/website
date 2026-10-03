/** 所有项目详情页共用同一套章节顺序。字段留空则该节不渲染，补内容时按此结构填写即可。 */

export const CASE_STUDY_SECTIONS = [
  { id: "overview", title: "项目概览" },
  { id: "gallery", title: "视觉记录" },
  { id: "background", title: "项目背景" },
  { id: "role", title: "我的职责" },
  { id: "features", title: "功能特性" },
  { id: "results", title: "项目成果" },
  { id: "optimizations", title: "优化成果" },
  { id: "changelog", title: "更新日志" },
  { id: "next", title: "下一步" },
] as const;

export const PROJECT_FIELD_GUIDE = `
填写项目时保持以下字段（空数组 / 省略均可，页面会跳过空节）：

{
  slug: "roommap",
  title: "项目名",
  description: "一句话简介",
  tags: ["标签"],
  type: "latest" | "past" | "personal",
  client: "客户 / 公司",
  year: "2024",
  role: "产品经理",
  period: "2023.03 — 2024.10",
  tools: ["Figma", "Jira"],
  image: "/images/projects/roommap/cover.jpg",
  gallery: [
    "/images/projects/roommap/01.jpg",
    "/images/projects/roommap/02.jpg"
  ],
  projectInfo: { background, objectives, challenges, solutions },
  responsibilities: [],
  features: { core, design, technical },
  achievements: { metrics, highlights },
  optimizations: { process, core, results },
  futurePlans: []
}

图片放到 public/images/projects/{slug}/ 下，路径以 /images/projects/ 开头。
`.trim();
