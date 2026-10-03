import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import PageHeader from "@/components/ui/PageHeader";
import GeometricBackdrop from "@/components/ui/GeometricBackdrop";
import Reveal from "@/components/ui/Reveal";
import Tag, { type TagTone } from "@/components/ui/Tag";
import { useRouter } from "next/router";
import { Ring, Square, Triangle } from "@/components/ui/BrandShapes";

interface KnowledgeArea {
  title: string;
  icon: React.ReactNode;
  tone: TagTone;
  topics: string[];
  tools: string[];
}

const areas: KnowledgeArea[] = [
  {
    title: "数据分析",
    icon: <Triangle size={24} />,
    tone: "blue",
    topics: ["数据清洗", "数据处理", "数据可视化", "数据挖掘", "数据分析"],
    tools: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
  },
  {
    title: "机器学习",
    icon: <Square size={22} />,
    tone: "yellow",
    topics: [
      "深度学习，包括卷积、循环和变换模型",
      "计算机视觉，包括目标检测和图像分割",
      "自然语言处理，包括文本分类和实体识别",
      "强化学习，包括价值学习和策略梯度",
    ],
    tools: ["scikit-learn", "TensorFlow", "PyTorch", "Keras"],
  },
  {
    title: "深度学习",
    icon: <Ring size={24} />,
    tone: "pink",
    topics: ["神经网络架构", "卷积神经网络", "循环神经网络", "变换模型", "注意力机制"],
    tools: ["动态图框架", "模型社区", "计算图框架", "数值框架"],
  },
];

const completed = ["AI 知识库搭建及使用", "AI 开发环境搭建及使用", "大语言模型应用开发", "多模态模型集成应用"];

const labs = [
  {
    title: "智能旅行助手",
    desc: "输入目的地后，连串完成景点的搜索、挑选与组合整理；按用户选择的城市和景点智能规划最优路线，并生成完整的旅行清单。",
    features: ["智能路线规划", "景点推荐系统", "实时天气集成", "交通方案优化", "住宿智能匹配", "行程文档导出"],
  },
  {
    title: "个人天气助理",
    desc: "把天气数据变成可执行的生活建议。",
    features: ["智能降雨预警提醒", "个性化穿衣建议", "出行计划天气分析", "智能衣物搭配推荐"],
  },
  { title: "智能收纳助手", desc: "基于深度学习的智能物品分类与收纳规划系统，提供个性化收纳方案。", features: [] },
  { title: "AI 穿搭顾问", desc: "基于计算机视觉的智能穿搭推荐系统，综合考虑场合、天气与个人风格。", features: [] },
];

const areasEn: KnowledgeArea[] = [
  {
    title: "Data",
    icon: <Triangle size={24} />,
    tone: "blue",
    topics: ["Cleaning", "Processing", "Charts", "Mining", "Analysis"],
    tools: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
  },
  {
    title: "Machine learning",
    icon: <Square size={22} />,
    tone: "yellow",
    topics: ["Deep learning", "Computer vision", "Language", "Reinforcement learning"],
    tools: ["scikit-learn", "TensorFlow", "PyTorch", "Keras"],
  },
  {
    title: "Deep learning",
    icon: <Ring size={24} />,
    tone: "pink",
    topics: ["Network design", "Convolution", "Recurrence", "Transformers", "Attention"],
    tools: ["PyTorch", "Hugging Face", "TensorFlow", "JAX"],
  },
];

const completedEn = ["Knowledge base for models", "Development setup", "Language-model applications", "Multimodal models"];

const labsEn = [
  {
    title: "Travel assistant",
    desc: "After a destination is entered, it searches places, picks them, and builds a route and a packing list.",
    features: ["Routes", "Place suggestions", "Weather", "Transport", "Stay matching", "Trip export"],
  },
  {
    title: "Weather assistant",
    desc: "Turns a forecast into something you can act on.",
    features: ["Rain alerts", "What to wear", "Trip weather", "Outfit ideas"],
  },
  { title: "Storage assistant", desc: "Sorts objects and suggests where they should go.", features: [] },
  { title: "Outfit advisor", desc: "Suggests clothes from the occasion, the weather, and a personal style.", features: [] },
];

const AIPage: NextPage = () => {
  const en = useRouter().locale === "en";
  const areaList = en ? areasEn : areas;
  const doneList = en ? completedEn : completed;
  const labList = en ? labsEn : labs;
  const lessons = en ? ["Deep learning basics", "Machine learning, further"] : ["深度学习基础", "机器学习进阶"];
  const lessonTag = en ? "Video · coming" : "视频教程 · 即将上线";
  return (
  <>
    <Head>
      <title>AI 专刊 | HUGH·Aix</title>
      <meta name="description" content="HUGH·Aix 的 AI 技术研究、实验项目与学习路径。" />
    </Head>

    <div className="relative isolate">
      <GeometricBackdrop />
      <PageHeader
        label={en ? "Lab" : "实验"}
        title={en ? "Intelligence" : "AI专刊"}
        subtitle={en ? "A working notebook of data, models, and applied intelligence." : "数据分析、机器学习，以及把模型用进产品的实验。"}
        note={en ? "This page is still being built." : "这一页还在继续写。"}
      />

      <div className="container-page space-y-20 pb-28">
        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{en ? "01 / Knowledge" : "01 / 知识体系"}</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {areaList.map((area, i) => (
              <Reveal key={area.title} delay={i * 0.06} className="h-full">
                <article className="flex h-full flex-col rounded-3xl border border-line bg-surface p-7">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-ink">{area.title}</h3>
                    {area.icon}
                  </div>
                  <ul className="mt-6 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-muted marker:text-line">
                    {area.topics.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-2 pt-8">
                    {area.tools.map((tool) => (
                      <Tag key={tool} tone={area.tone}>
                        {tool}
                      </Tag>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <article className="h-full rounded-3xl bg-night p-8 text-white">
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-white/55">{en ? "02 / Progress" : "02 / 研究进度"}</h2>
              <p className="mt-8 text-sm text-white/60">{en ? "In progress" : "当前进行中"}</p>
              <p className="mt-2 flex items-center gap-3 text-2xl font-semibold">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-yellow opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-yellow" />
                </span>
                {en ? "Setting up model context services" : "模型上下文服务的搭建和使用"}
              </p>
              <p className="mt-10 text-sm text-white/60">{en ? "Done" : "已完成"}</p>
              <ul className="mt-3 space-y-3">
                {doneList.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/90">
                    <svg className="h-4 w-4 shrink-0 text-brand-yellow" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="m4 10.5 4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{en ? "03 / Experiments" : "03 / 创意实验"}</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {labList.map((lab, i) => (
                <Reveal key={lab.title} delay={(i % 2) * 0.06} className="h-full">
                  <article className="h-full rounded-3xl border border-line bg-surface p-7">
                    <h3 className="text-lg font-semibold text-ink">{lab.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">{lab.desc}</p>
                    {lab.features.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {lab.features.map((f) => (
                          <Tag key={f}>{f}</Tag>
                        ))}
                      </div>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{en ? "04 / Study" : "04 / 原理学习"}</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {lessons.map((title, i) => (
              <article key={title} className="overflow-hidden rounded-3xl border border-line bg-surface">
                <div className={`flex aspect-video items-center justify-center ${i === 0 ? "bg-brand-blue/10" : "bg-brand-pink/10"}`}>
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface text-ink shadow-sm">
                    <svg className="ml-0.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path d="M6 4.5v11l9-5.5-9-5.5Z" />
                    </svg>
                  </span>
                </div>
                <div className="flex items-center justify-between p-6">
                  <h3 className="text-lg font-semibold text-ink">{title}</h3>
                  <Tag>{lessonTag}</Tag>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  </>
  );
};

export default AIPage;
