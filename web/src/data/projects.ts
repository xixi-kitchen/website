// src/data/projects.ts

export interface Project {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  duration?: string;
  role?: string;
  image?: string;
  tags?: string[];
  link?: string;
  details?: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "智能家居APP 3.0升级",
    subtitle: "全面升级用户体验",
    description: "领导APP3.0的全面升级，涵盖计划、设计、开发到发布全过程，拉开新版本APP序幕。主导APP 80%页面的设计更新，统一设计元素，凸显高级感与专业性。",
    duration: "2023.5 - 2023.12",
    role: "产品负责人",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    tags: ["产品管理", "UI/UX设计", "智能家居", "移动应用"],
    link: "https://example.com/smart-home-app",
    details: [
      "重新设计用户界面，提升用户体验",
      "引入家庭账号功能，完善用户账号管理体系",
      "开发RoomMap功能，提供直观的智能家居控制界面",
      "实现全端支持黑暗模式，优化夜间使用体验",
      "将代理商功能和C端用户功能进行分离，并根据各自特点进行专项优化"
    ]
  },
  {
    id: 2,
    title: "Nature OS系统扩展",
    subtitle: "增强智能家居系统功能",
    description: "扩展Nature OS功能，支持多触发源控制及智能设备集成，增强系统智能化水平。实现包含手机端、中控屏幕端的心结框架整理、设计和交互统一工作。",
    duration: "2023.8 - 2024.2",
    role: "技术负责人",
    image: "https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    tags: ["系统架构", "物联网", "智能控制", "用户体验"],
    details: [
      "设计并实现多触发源控制系统",
      "整合多种智能设备接口",
      "优化系统响应速度和稳定性",
      "统一各端交互方式，减轻用户认知负担"
    ]
  },
  {
    id: 3,
    title: "智能家居微信小程序",
    subtitle: "从0到1的全流程开发",
    description: "从0到1完成智能家居小程序的规划、安排设计、开发排期、测试、发布及后续迭代工作，为用户提供便捷的移动控制方案。",
    duration: "2023.10 - 2024.1",
    role: "项目经理",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    tags: ["微信小程序", "智能家居", "项目管理", "全栈开发"],
    details: [
      "制定项目计划和开发路线图",
      "设计小程序UI/UX，确保简洁易用",
      "协调开发团队，确保按时交付",
      "实现设备控制、场景管理等核心功能",
      "建立用户反馈机制，持续优化产品"
    ]
  },
  {
    id: 4,
    title: "产品AI知识库建设",
    subtitle: "AI赋能产品信息管理",
    description: "创建公司产品资料的知识库，并接入AI大模型，实现更好的信息检索、整合。为销售、技术支持提供产品知识问答服务，充分利用AI能力提高工作效率。",
    duration: "2023.11 - 2024.3",
    role: "AI解决方案架构师",
    image: "https://images.unsplash.com/photo-1677442135136-760c813dce26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    tags: ["人工智能", "知识管理", "大语言模型", "数据处理"],
    details: [
      "设计知识库架构和数据模型",
      "整合产品文档、规格说明和常见问题",
      "接入大语言模型，实现智能问答",
      "开发用户友好的查询界面",
      "建立知识更新机制，确保信息时效性"
    ]
  },
  {
    id: 5,
    title: "外贸管理系统交互改版",
    subtitle: "优化用户体验，提升工作效率",
    description: "负责外贸管理板块中邮件模块的交互改版，主要负责设置功能的认知结构重组，使设置的用户停留时长缩短了50%。外贸管理板块整体交互共提供400+交互修改需求。",
    duration: "2022.5 - 2022.9",
    role: "交互设计师",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    tags: ["交互设计", "用户体验", "SaaS系统", "外贸管理"],
    details: [
      "分析用户行为数据，识别交互痛点",
      "重构设置功能的认知结构",
      "优化邮件模块的整体交互流程",
      "提供400+交互修改建议并通过项目评审"
    ]
  },
  {
    id: 6,
    title: "全球买家板块交互优化",
    subtitle: "提升用户满意度",
    description: "在没有产品经理的情况下维持全球买家整个板块的日常运作并对整个板块进行结构重组改版。与UI协同完成整个全球买家板块的交互优化改版，最终用户好评率达到90%。",
    duration: "2022.10 - 2023.2",
    role: "用户体验负责人",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    tags: ["用户体验", "交互设计", "全球买家", "数据分析"],
    details: [
      "进行用户调研，收集用户反馈",
      "对整个板块进行结构重组",
      "处理200+工单需求",
      "与UI团队协作完成高还原度原型",
      "交付产品文档给开发团队",
      "最终用户好评率达到90%"
    ]
  },
  {
    id: 7,
    title: "NEO新机型工业设计",
    subtitle: "产品外观与UI/UX设计",
    description: "负责NEO新机型的渲染和图片处理，对接产品研发设计单位，完成新品硬件外观设计及UI/UX逻辑框架。完成公司一半机型的新模型渲染及生产标准更新。",
    duration: "2021.4 - 2022.1",
    role: "工业设计工程师",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    tags: ["工业设计", "3D渲染", "产品开发", "UI/UX设计"],
    details: [
      "负责NEO新机型的3D建模与渲染",
      "完成产品外观设计与优化",
      "设计UI/UX逻辑框架",
      "更新生产标准文档",
      "参与新品发布准备工作"
    ]
  },
  {
    id: 8,
    title: "公司官网更新项目",
    subtitle: "品牌视觉系统升级",
    description: "负责对接设计公司完成公司新视觉系统的设计，主导公司官网更新。参与制定公司新视觉系统设计，提升品牌形象。",
    duration: "2021.9 - 2022.3",
    role: "视觉设计负责人",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    tags: ["网站设计", "品牌视觉", "UI设计", "项目管理"],
    details: [
      "制定品牌视觉系统规范",
      "主导官网设计与开发",
      "协调内外部资源，确保项目顺利进行",
      "优化网站用户体验与性能",
      "建立网站内容更新机制"
    ]
  }
];

export default projects;
