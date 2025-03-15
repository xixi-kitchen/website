export interface Toy {
  id: number;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  link?: string;
  github?: string;
  status: 'completed' | 'in-progress' | 'planned';
  techStack: string[];
  features?: string[];
  inspiration?: string;
}

export const toys: Toy[] = [
  {
    id: 1,
    title: "智能桌面宠物",
    description: "一个基于 Electron 开发的桌面宠物应用，可以陪伴用户工作，提供天气、日程提醒等功能",
    tags: ["桌面应用", "人工智能", "互动"],
    status: "in-progress",
    techStack: ["Electron", "React", "TypeScript", "TensorFlow.js"],
    features: [
      "可爱的动画效果",
      "智能对话功能",
      "天气提醒",
      "日程管理",
      "自定义宠物形象"
    ],
    inspiration: "希望让工作的时候也能有一个可爱的小伙伴陪伴"
  },
  {
    id: 2,
    title: "代码片段生成器",
    description: "输入自然语言描述，自动生成对应的代码片段，支持多种编程语言",
    tags: ["开发工具", "AI", "效率"],
    status: "planned",
    techStack: ["Next.js", "OpenAI API", "TailwindCSS"],
    features: [
      "自然语言转代码",
      "多语言支持",
      "代码高亮",
      "一键复制"
    ],
    inspiration: "让编程更加直观和高效"
  }
]; 