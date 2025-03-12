import React from "react";
import Head from "next/head";
import Image from "next/image";

interface Experience {
  period: string;
  company: string;
  title: string;
  responsibilities?: string[];
  achievements?: string[];
  skills?: string[];
  highlights?: string[];
}

interface TimelineEvent {
  date: string;
  description: string;
}

// 工作经历数据
const experiences: Experience[] = [
  {
    period: "2023.5-至今",
    company: "杭州行至云起科技有限公司",
    title: "高级软件产品经理、软件产品总负责人",
    responsibilities: [
      "负责全部软件产品的整体规划、设计、开发、发布及后续迭代工作。",
      "管理软件产品团队，确保项目按时按质完成，提升产品市场竞争力。",
      "与各部门紧密协作，推动产品功能实现及优化，提升用户体验。",
      "跟踪行业趋势，进行竞品分析，为产品战略决策提供依据。",
      "建立并完善数据指标分析体系，为产品优化和决策提供数据支持。",
      "制定软件 OEM 策略及方案，为公司带来更多业务，提升软件价值。",
    ],
    achievements: [
      "APP3.0升级项目：成功领导APP3.0的全面升级，涵盖计划、设计、开发到发布全过程，拉开新版本APP序幕。",
      "界面设计更新：主导APP 80%页面（用户使用页面100%）的设计更新，统一设计元素，凸显高级感与专业性。",
      "家庭账号功能：发布家庭账号功能，完善用户账号管理体系，大幅提升安全性。",
      "RoomMap功能：推出RoomMap功能，提升APP体验，通过直观界面和直觉交互增强用户满意度。",
      "全互动端设计风格、交互方式统一：实现包含手机端、中控屏幕端的心结框架整理、设计和交互统一工作，让用户认知负担更轻，使用智能家居更便捷。",
      "黑暗模式：实现全端支持黑暗模式，在黑夜中，也不会对用户有任何干扰，比用户更关爱自己。",
      "B、C 端操作分离：将代理商功能和 C 端用户功能进行分离，并根据各自特点进行专项优化。",
      "中控屏设备语音接入：对接科大讯飞语音，实现更好的语音交互体验",
      "数据指标分析体系：建立全面的数据指标分析体系，涵盖用户行为、产品性能、市场反馈等多维度数据，为产品优化和决策提供有力支持。",
      "软件OEM定制：管理多个软件定制项目，包括为日本Acllab定制Nature APP、韩国Ulroot停车系统接入、大华定制软件、韩国 ULroot 全定制软件等，满足客户定制需求，开拓新业务，为公司带来200W 美金的业绩，业绩增长200%。",
      "技术支持与整合：完成阿联酋Deye太阳能逆变器对接等485对接、Zigbee 对接需求及其他协议设备对接，确保产品与第三方设备的顺畅连接。",
      "产品 AI 知识库建立：创建了公司产品资料的知识库，并接入了 AI 大模型，实现更好的信息检索、整合。同时也为销售、技术支持的同时提供了产品知识问答服务，充分利用 AI 能力提高工作效率",
      "智能家居微信小程序：从0到1完成智能家居小程序的规划、安排设计、开发排期、测试、发布及后续迭代工作",
    ],
    skills: [
      "软件开发：熟练掌握多种编程语言（如Java、Python、C++等），具备丰富的软件开发和调试经验。",
      "产品设计：擅长用户体验设计（UX）和用户界面设计（UI），能够将设计理念转化为实际产品。",
      "数据分析和处理：精通数据分析工具（如Excel、SQL、Tableau等），能够建立复杂的数据指标分析体系。",
      "项目管理：熟悉敏捷开发方法，能够有效管理项目进度和团队协作。",
      "系统架构：具备系统架构设计能力，能够规划和实现大型软件系统的技术架构。",
      "跨平台开发：熟悉跨平台开发技术（如React Native、Flutter等），能够开发适用于多平台的应用程序。",
      "物联网技术：了解物联网（IoT）技术，能够实现智能设备的集成和通信。",
    ],
    highlights: [
      "LifeSmart APP：持续迭代，引入新功能，提升用户体验和市场表现。",
      "Nature OS：扩展功能，支持多触发源控制及智能设备集成，增强系统智能化水平。",
      "Nature Store：设计并发布多款新皮肤，提供个性化定制服务，增加用户粘性。",
    ],
  },
  {
    period: "2022.5-2023.4",
    company: "富通天下（杭州）云技术研发中心",
    title: "交互设计师、用户体验负责人",
    responsibilities: [
      "外贸管理板块中邮件模块的交互改版；",
      "外贸管理板块整体交互评估及优化；",
      "客户评分功能的整体设计构思；",
      "全球买家板块整体负责；",
      "包括日常运营、工单处理、需求反馈；",
      "对整个板块进行交互改版；",
      "社媒搜索集成功能的整体设计和构思；",
      "对整个saas系统进行交互评估及优化；",
      "业务系统板块整体交互评估及优化；",
      "使用者调研：包含建立用户画像、用户旅程、同理心地图、数据分析、用户访谈等交互研究方法；",
      "数据引流模块的整体构思设计；",
    ],
    achievements: [
      "与产品经理协同完成了邮件模块的改版，主要负责了其中设置功能的认知结构重组，使设置的用户停留时长缩短了50%；",
      "外贸管理板块整体交互共提供400+交互修改需求，并通过了项目评审；",
      "完成了客户评分功能的整体构思；",
      "在没有产品经理的情况下维持了全球买家整个板块的日常运作并对整个板块进行了结构重组改版",
      "管理运行期间维持数据更新；对200+工单需求进行了反馈以及处理；并进行了用户调研，为后续的优化改版提供了资料支撑；",
      "与UI协同完成了整个全球买家板块的交互优化改版，并最终产出高还原度原型以及产品文档交付开发使用；最终用户好评率达到90%",
      "完成社媒聚合功能的整体构思；",
      "完成了对业务系统板块使用者的调研并以此为基础进行了对整个业务系统的流程重构，从用户的角度出发更加细致地完善了业务系统整体流程的链路全过程，最终产出为业务系统改版的低还原度原型；",
      "数据引流网站的结构搭建、低还原度原型、产品文档；与UI协同完成高还原度原型并交付开发使用；",
    ],
  },
  {
    period: "2021.4-2022.4",
    company: "泰瑞机器股份有限公司",
    title: "研发工程师（工业设计模块）",
    responsibilities: [
      "负责工业设计模块更新 负责NEO新机型的渲染和图片处理",
      "负责对接产品研发设计单位，完成新品硬件外观设计及UI/UX逻辑框架、",
      "负责对接设计公司完成公司新视觉系统的设计（包括官网更新）",
    ],
    achievements: [
      "完成公司一半机型的新模型渲染及生产标准更新；参与制定公司新视觉系统设计；主导公司官网更新。",
    ],
  },
];

// 时间线事件数据
const timelineEvents: Record<string, TimelineEvent[]> = {
  "2023": [
    {
      date: "7月",
      description: "个人独立完成的作品集网站 Human design studio 1.0正式上线（现已下线，2.0 正在制作中）",
    },
    {
      date: "5月-7月",
      description: "将过去的项目和创意进行整理，开始整理制作自己的个人网站，在整个制作过程中也将过去所学的所有知识、能力、技能都运用在其中，从而做出了 Human designer studio 的1.0版本。",
    },
  ],
};

// 页面元数据
const pageMetadata = {
  title: "经历 | HUGH·Aix",
  description: "我的职业经历和项目经验",
};

// 页面标题
const pageTitle = {
  main: "Chronological experience",
  sub: "经历编年",
};

const ExperiencePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>{pageMetadata.title}</title>
        <meta name="description" content={pageMetadata.description} />
      </Head>

      <div className="w-full bg-amber-50 min-h-screen">
        <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex flex-col items-center justify-center gap-8 sm:gap-11 text-black">
            {/* 页面标题部分 */}
            <div className="w-full flex flex-col items-start gap-6 sm:gap-10">
              <div className="w-full flex flex-row items-center justify-between">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-semibold leading-tight [text-shadow:4px_0_0_#000,_0_4px_0_#000,_-4px_0_0_#000,_0_-4px_0_#000]">
                  {pageTitle.main}
                </h1>
                <Image
                  className="w-24 sm:w-32 md:w-40 lg:w-56 h-auto"
                  width={224}
                  height={254}
                  alt=""
                  src="Vector.svg"
                  priority
                />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl text-gray leading-normal">
                {pageTitle.sub}
              </h2>
            </div>
            
            {/* 经历内容部分 */}
            <div className="w-full flex flex-col items-start gap-16 sm:gap-20 md:gap-24 text-dimgray-100">
              <div className="w-full flex flex-col items-start gap-12 sm:gap-16">
                {/* 工作经历部分 */}
                {experiences.map((exp, index) => (
                  <section key={index} className="w-full flex flex-col items-start gap-5">
                    <div className={`text-base sm:text-lg md:text-xl font-medium leading-normal ${index > 0 ? 'text-dimgray-200' : ''}`}>
                      {exp.period}
                    </div>
                    <div className="w-full flex flex-col items-start gap-3 sm:gap-4">
                      <h3 className={`text-lg sm:text-xl md:text-2xl font-semibold leading-normal ${index > 0 ? 'text-dimgray-200' : 'text-black'}`}>
                        {exp.company}
                      </h3>
                      <div className="text-base sm:text-lg md:text-xl font-light leading-normal">
                        {exp.title}
                      </div>
                      
                      {/* 核心职责 */}
                      {exp.responsibilities && (
                        <>
                          <div className="w-full">
                            <h4 className="text-base sm:text-lg md:text-xl leading-normal">
                              {index === 0 ? "核心职责：" : "内容："}
                            </h4>
                          </div>
                          <div className="w-full text-sm sm:text-base leading-relaxed">
                            <ol className="list-decimal pl-5 space-y-1">
                              {exp.responsibilities.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ol>
                          </div>
                        </>
                      )}
                      
                      {/* 主要成就 */}
                      {exp.achievements && (
                        <>
                          <div className="w-full">
                            <h4 className="text-base sm:text-lg md:text-xl leading-normal">
                              {index === 0 ? "主要成就：" : "业绩："}
                            </h4>
                          </div>
                          <div className="w-full text-sm sm:text-base leading-relaxed">
                            {Array.isArray(exp.achievements) ? (
                              <ol className="list-decimal pl-5 space-y-1">
                                {exp.achievements.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ol>
                            ) : (
                              <div>{exp.achievements}</div>
                            )}
                          </div>
                        </>
                      )}
                      
                      {/* 技能专长 */}
                      {exp.skills && (
                        <>
                          <div className="w-full">
                            <h4 className="text-base sm:text-lg md:text-xl leading-normal">
                              技能专长：
                            </h4>
                          </div>
                          <div className="w-full text-sm sm:text-base leading-relaxed">
                            <ol className="list-decimal pl-5 space-y-1">
                              {exp.skills.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ol>
                          </div>
                        </>
                      )}
                      
                      {/* 项目亮点 */}
                      {exp.highlights && (
                        <>
                          <div className="w-full">
                            <h4 className="text-base sm:text-lg md:text-xl leading-normal">
                              项目亮点：
                            </h4>
                          </div>
                          <div className="w-full text-sm sm:text-base leading-relaxed">
                            <ol className="list-decimal pl-5 space-y-1">
                              {exp.highlights.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ol>
                          </div>
                        </>
                      )}
                    </div>
                  </section>
                ))}
                
                {/* 时间线事件部分 */}
                {Object.entries(timelineEvents).map(([year, events]) => (
                  <section key={year} className="w-full flex flex-col items-start gap-5">
                    <div className="text-base sm:text-lg md:text-xl font-medium text-dimgray-200 leading-normal">
                      {year}
                    </div>
                    {events.map((event, index) => (
                      <div key={index} className="w-full flex flex-col items-start gap-3 sm:gap-4">
                        <h3 className="text-base sm:text-lg md:text-xl leading-normal">
                          {event.date}
                        </h3>
                        <div className="w-full text-sm sm:text-base leading-relaxed">
                          {event.description}
                        </div>
                      </div>
                    ))}
                  </section>
                ))}
              </div>
              <div className="text-base sm:text-lg md:text-xl font-medium leading-normal">
                更多经历正在体验中······
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ExperiencePage;
