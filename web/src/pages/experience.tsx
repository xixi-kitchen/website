import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
}

const experiences: Experience[] = [
  // {
  //   title: '高级软件产品经理、软件产品总负责人',
  //   company: '杭州行至云起科技有限公司',
  //   period: '2023.5 - 至今',
  //   description: [
  //     '负责全部软件产品的整体规划、设计、开发、发布及后续迭代工作。',
  //     '管理软件产品团队，确保项目按时按质完成，提升产品市场竞争力。',
  //     '推动产品功能实现及优化，提升用户体验。',
  //     '跟踪行业趋势，进行竞品分析，为产品战略决策提供依据。',
  //     '建立并完善数据指标分析体系，为产品优化和决策提供数据支持。',
  //     '制定软件 OEM 策略及方案，为公司带来更多业务，提升软件价值。',
  //   ],
  //   skills: ['产品管理', 'React', 'TypeScript', '数据分析', '项目管理'],
  // },
  // {
  //   title: '交互设计师、用户体验负责人',
  //   company: '富通天下（杭州）云技术研发中心',
  //   period: '2022.5 - 2023.4',
  //   description: [
  //     '负责邮件模块的交互改版。',
  //     '全球买家板块整体交互优化及日常运营。',
  //     '社媒搜索集成功能设计。',
  //     '用户旅程、数据分析、用户访谈等交互研究。',
  //   ],
  //   skills: ['交互设计', '用户体验研究', '数据分析', 'SaaS 产品优化'],
  // },
  // {
  //   title: '研发工程师（工业设计模块）',
  //   company: '泰瑞机器股份有限公司',
  //   period: '2021.4 - 2022.4',
  //   description: [
  //     '负责工业设计模块更新。',
  //     '负责NEO新机型的渲染和图片处理。',
  //     '负责对接产品研发设计单位，完成新品硬件外观设计及UI/UX框架。',
  //     '主导公司官网更新。',
  //   ],
  //   skills: ['工业设计', 'UI/UX 设计', '产品研发'],
  // },
];

const ExperiencePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>经历 | HUGH·Aix</title>
        <meta name="description" content="我的职业经历和项目经验" />
      </Head>

      <main className="max-w-6xl mx-auto px-6 py-12 bg-amber-50">
      <div className="w-full relative h-[192rem] flex flex-col items-center justify-center p-[3.125rem] box-border gap-[2.75rem] text-left text-[8rem] text-black font-font">
<div className="self-stretch flex flex-col items-start justify-start gap-[2.687rem]">
<div className="self-stretch h-[15.875rem] flex flex-row items-center justify-between gap-[0rem]">
<div className="flex-1 relative leading-[99.52%] font-semibold [text-shadow:4px_0_0_#000,_0_4px_0_#000,_-4px_0_0_#000,_0_-4px_0_#000]">Chronological experience</div>
<Image className="w-[14.019rem] relative max-h-full" width={224} height={254} alt="" src="Vector.svg" />
</div>
<div className="self-stretch relative text-[3rem] leading-[150%] text-gray">经历编年</div>
</div>
<div className="self-stretch flex flex-col items-start justify-start gap-[5.687rem] text-[1.5rem] text-dimgray-100">
<div className="self-stretch flex flex-col items-start justify-start gap-[3.75rem]">
<div className="self-stretch flex flex-col items-start justify-start gap-[1.25rem]">
<div className="relative leading-[150%] font-medium">2023.5-至今</div>
<div className="self-stretch flex flex-col items-start justify-start gap-[0.875rem]">
<div className="flex flex-row items-start justify-start text-black">
<div className="relative leading-[150%] font-semibold">杭州行至云起科技有限公司</div>
</div>
<div className="flex flex-row items-start justify-start">
<div className="relative leading-[150%] font-light">高级软件产品经理、软件产品总负责人</div>
</div>
<div className="self-stretch flex flex-row items-start justify-start">
<div className="relative leading-[150%]">核心职责：</div>
</div>
<div className="self-stretch flex flex-col items-start justify-start text-[0.875rem]">
<div className="self-stretch relative leading-[150%]">
<ol className="m-0 font-inherit text-inherit pl-[1.357rem]">
<li className="my-[undefined] mx-[undefined]">负责全部软件产品的整体规划、设计、开发、发布及后续迭代工作。</li>
<li className="my-[undefined] mx-[undefined]">管理软件产品团队，确保项目按时按质完成，提升产品市场竞争力。</li>
<li className="my-[undefined] mx-[undefined]">与各部门紧密协作，推动产品功能实现及优化，提升用户体验。</li>
<li className="my-[undefined] mx-[undefined]">跟踪行业趋势，进行竞品分析，为产品战略决策提供依据。</li>
<li className="my-[undefined] mx-[undefined]">建立并完善数据指标分析体系，为产品优化和决策提供数据支持。</li>
<li>制定软件 OEM 策略及方案，为公司带来更多业务，提升软件价值。</li>
</ol>
</div>
</div>
<div className="self-stretch flex flex-row items-start justify-start">
<div className="relative leading-[150%]">主要成就：</div>
</div>
<div className="self-stretch flex flex-col items-start justify-start text-[0.875rem]">
<div className="self-stretch relative leading-[150%]">
<ol className="m-0 font-inherit text-inherit pl-[1.357rem]">
<li className="my-[undefined] mx-[undefined]">APP3.0升级项目：成功领导APP3.0的全面升级，涵盖计划、设计、开发到发布全过程，拉开新版本APP序幕。</li>
<li className="my-[undefined] mx-[undefined]">界面设计更新：主导APP 80%页面（用户使用页面100%）的设计更新，统一设计元素，凸显高级感与专业性。</li>
<li className="my-[undefined] mx-[undefined]">家庭账号功能：发布家庭账号功能，完善用户账号管理体系，大幅提升安全性。</li>
<li className="my-[undefined] mx-[undefined]">RoomMap功能：推出RoomMap功能，提升APP体验，通过直观界面和直觉交互增强用户满意度。</li>
<li className="my-[undefined] mx-[undefined]">全互动端设计风格、交互方式统一：实现包含手机端、中控屏幕端的心结框架整理、设计和交互统一工作，让用户认知负担更轻，使用智能家居更便捷。</li>
<li className="my-[undefined] mx-[undefined]">黑暗模式：实现全端支持黑暗模式，在黑夜中，也不会对用户有任何干扰，比用户更关爱自己。</li>
<li className="my-[undefined] mx-[undefined]"> B、C 端操作分离：将代理商功能和 C 端用户功能进行分离，并根据各自特点进行专项优化。</li>
<li className="my-[undefined] mx-[undefined]">中控屏设备语音接入：对接科大讯飞语音，实现更好的语音交互体验</li>
<li className="my-[undefined] mx-[undefined]">数据指标分析体系：建立全面的数据指标分析体系，涵盖用户行为、产品性能、市场反馈等多维度数据，为产品优化和决策提供有力支持。</li>
<li className="my-[undefined] mx-[undefined]">软件OEM定制：管理多个软件定制项目，包括为日本Acllab定制Nature APP、韩国Ulroot停车系统接入、大华定制软件、韩国 ULroot 全定制软件等，满足客户定制需求，开拓新业务，为公司带来200W 美金的业绩，业绩增长200%。</li>
<li className="my-[undefined] mx-[undefined]">技术支持与整合：完成阿联酋Deye太阳能逆变器对接等485对接、Zigbee 对接需求及其他协议设备对接，确保产品与第三方设备的顺畅连接。</li>
<li className="my-[undefined] mx-[undefined]">产品 AI 知识库建立：创建了公司产品资料的知识库，并接入了 AI 大模型，实现更好的信息检索、整合。同时也为销售、技术支持的同时提供了产品知识问答服务，充分利用 AI 能力提高工作效率</li>
<li>智能家居微信小程序：从0到1完成智能家居小程序的规划、安排设计、开发排期、测试、发布及后续迭代工作</li>
</ol>
</div>
</div>
<div className="self-stretch flex flex-row items-start justify-start">
<div className="relative leading-[150%]">技能专长：</div>
</div>
<div className="self-stretch flex flex-col items-start justify-start text-[0.875rem]">
<div className="self-stretch relative leading-[150%]">
<ol className="m-0 font-inherit text-inherit pl-[1.357rem]">
<li className="my-[undefined] mx-[undefined]">软件开发：熟练掌握多种编程语言（如Java、Python、C++等），具备丰富的软件开发和调试经验。</li>
<li className="my-[undefined] mx-[undefined]">产品设计：擅长用户体验设计（UX）和用户界面设计（UI），能够将设计理念转化为实际产品。</li>
<li className="my-[undefined] mx-[undefined]">数据分析和处理：精通数据分析工具（如Excel、SQL、Tableau等），能够建立复杂的数据指标分析体系。</li>
<li className="my-[undefined] mx-[undefined]">项目管理：熟悉敏捷开发方法，能够有效管理项目进度和团队协作。</li>
<li className="my-[undefined] mx-[undefined]">系统架构：具备系统架构设计能力，能够规划和实现大型软件系统的技术架构。</li>
<li className="my-[undefined] mx-[undefined]">跨平台开发：熟悉跨平台开发技术（如React Native、Flutter等），能够开发适用于多平台的应用程序。</li>
<li>物联网技术：了解物联网（IoT）技术，能够实现智能设备的集成和通信。</li>
</ol>
</div>
</div>
<div className="self-stretch flex flex-row items-start justify-start">
<div className="relative leading-[150%]">项目亮点：</div>
</div>
<div className="self-stretch flex flex-col items-start justify-start text-[0.875rem]">
<div className="self-stretch relative leading-[150%]">
<ol className="m-0 font-inherit text-inherit pl-[1.357rem]">
<li className="my-[undefined] mx-[undefined]">LifeSmart APP：持续迭代，引入新功能，提升用户体验和市场表现。</li>
<li className="my-[undefined] mx-[undefined]">Nature OS：扩展功能，支持多触发源控制及智能设备集成，增强系统智能化水平。</li>
<li>Nature Store：设计并发布多款新皮肤，提供个性化定制服务，增加用户粘性。</li>
</ol>
</div>
</div>
</div>
</div>
<div className="self-stretch flex flex-col items-start justify-start gap-[1.25rem]">
<div className="relative leading-[150%] font-medium text-dimgray-200">2023</div>
<div className="self-stretch flex flex-col items-start justify-start gap-[0.875rem]">
<div className="relative leading-[150%]">7月</div>
<div className="self-stretch flex flex-col items-start justify-start text-[0.875rem]">
<div className="self-stretch relative leading-[150%]">个人独立完成的作品集网站 Human design studio 1.0正式上线（现已下线，2.0 正在制作中）</div>
</div>
</div>
<div className="self-stretch flex flex-col items-start justify-start gap-[0.875rem]">
<div className="relative leading-[150%]">5月-7月</div>
<div className="self-stretch flex flex-col items-start justify-start text-[0.875rem]">
<div className="self-stretch relative leading-[150%]">将过去的项目和创意进行整理，开始整理制作自己的个人网站，在整个制作过程中也将过去所学的所有知识、能力、技能都运用在其中，从而做出了 Human designer studio 的1.0版本。</div>
</div>
</div>
</div>
<div className="self-stretch flex flex-col items-start justify-start gap-[1.25rem] text-dimgray-200">
<div className="relative leading-[150%] font-medium">2022.5-2023.4</div>
<div className="self-stretch flex flex-col items-start justify-start gap-[0.875rem] text-dimgray-100">
<div className="flex flex-row items-start justify-start text-dimgray-200">
<div className="relative leading-[150%] font-semibold">富通天下（杭州）云技术研发中心</div>
</div>
<div className="flex flex-row items-start justify-start">
<div className="relative leading-[150%] font-light">交互设计师、用户体验负责人</div>
</div>
<div className="self-stretch flex flex-row items-start justify-start">
<div className="relative leading-[150%]">内容：</div>
</div>
<div className="self-stretch flex flex-col items-start justify-start text-[0.875rem]">
<div className="self-stretch relative leading-[150%]">
<ol className="m-0 font-inherit text-inherit pl-[1.357rem]">
<li className="my-[undefined] mx-[undefined]">外贸管理板块中邮件模块的交互改版；</li>
<li className="my-[undefined] mx-[undefined]">外贸管理板块整体交互评估及优化；</li>
<li className="my-[undefined] mx-[undefined]">客户评分功能的整体设计构思；</li>
<li className="my-[undefined] mx-[undefined]">全球买家板块整体负责；</li>
<li className="my-[undefined] mx-[undefined]">包括日常运营、工单处理、需求反馈；</li>
<li className="my-[undefined] mx-[undefined]">对整个板块进行交互改版；</li>
<li className="my-[undefined] mx-[undefined]">社媒搜索集成功能的整体设计和构思；</li>
<li className="my-[undefined] mx-[undefined]">对整个saas系统进行交互评估及优化；</li>
<li className="my-[undefined] mx-[undefined]">业务系统板块整体交互评估及优化；</li>
<li className="my-[undefined] mx-[undefined]">使用者调研：包含建立用户画像、用户旅程、同理心地图、数据分析、用户访谈等交互研究方法；</li>
<li>数据引流模块的整体构思设计；</li>
</ol>
</div>
</div>
<div className="self-stretch flex flex-row items-start justify-start">
<div className="relative leading-[150%]">业绩：</div>
</div>
<div className="self-stretch flex flex-col items-start justify-start text-[0.875rem]">
<div className="self-stretch relative leading-[150%]">
<ol className="m-0 font-inherit text-inherit pl-[1.357rem]">
<li className="my-[undefined] mx-[undefined]">与产品经理协同完成了邮件模块的改版，主要负责了其中设置功能的认知结构重组，使设置的用户停留时长缩短了50%；</li>
<li className="my-[undefined] mx-[undefined]">外贸管理板块整体交互共提供400+交互修改需求，并通过了项目评审；</li>
<li className="my-[undefined] mx-[undefined]">完成了客户评分功能的整体构思；</li>
<li className="my-[undefined] mx-[undefined]">在没有产品经理的情况下维持了全球买家整个板块的日常运作并对整个板块进行了结构重组改版</li>
<li className="my-[undefined] mx-[undefined]">管理运行期间维持数据更新；对200+工单需求进行了反馈以及处理；并进行了用户调研，为后续的优化改版提供了资料支撑；</li>
<li className="my-[undefined] mx-[undefined]">与UI协同完成了整个全球买家板块的交互优化改版，并最终产出高还原度原型以及产品文档交付开发使用；最终用户好评率达到90%</li>
<li className="my-[undefined] mx-[undefined]">完成社媒聚合功能的整体构思；</li>
<li className="my-[undefined] mx-[undefined]">完成了对业务系统板块使用者的调研并以此为基础进行了对整个业务系统的流程重构，从用户的角度出发更加细致地完善了业务系统整体流程的链路全过程，最终产出为业务系统改版的低还原度原型；</li>
<li>数据引流网站的结构搭建、低还原度原型、产品文档；与UI协同完成高还原度原型并交付开发使用；</li>
</ol>
</div>
</div>
</div>
</div>
<div className="self-stretch flex flex-col items-start justify-start gap-[1.25rem] text-dimgray-200">
<div className="relative leading-[150%] font-medium">2021.4-2022.4</div>
<div className="self-stretch flex flex-col items-start justify-start gap-[0.875rem] text-dimgray-100">
<div className="flex flex-row items-start justify-start text-dimgray-200">
<div className="relative leading-[150%] font-semibold">泰瑞机器股份有限公司</div>
</div>
<div className="flex flex-row items-start justify-start">
<div className="relative leading-[150%] font-light">研发工程师（工业设计模块）</div>
</div>
<div className="self-stretch flex flex-row items-start justify-start">
<div className="relative leading-[150%]">内容：</div>
</div>
<div className="self-stretch flex flex-col items-start justify-start text-[0.875rem]">
<div className="self-stretch relative leading-[150%]">
<ol className="m-0 font-inherit text-inherit pl-[1.357rem]">
<li className="my-[undefined] mx-[undefined]">{`负责工业设计模块更新
负责NEO新机型的渲染和图片处理`}</li>
<li className="my-[undefined] mx-[undefined]">负责对接产品研发设计单位，完成新品硬件外观设计及UI/UX逻辑框架、</li>
<li>负责对接设计公司完成公司新视觉系统的设计（包括官网更新）</li>
</ol>
</div>
</div>
<div className="self-stretch flex flex-row items-start justify-start">
<div className="relative leading-[150%]">业绩：</div>
</div>
<div className="self-stretch flex flex-col items-start justify-start text-[0.875rem]">
<div className="self-stretch relative leading-[150%]">完成公司一半机型的新模型渲染及生产标准更新；参与制定公司新视觉系统设计；主导公司官网更新。
</div>
</div>
</div>
</div>
</div>
<div className="relative leading-[150%] font-medium">更多经历正在体验中······</div>
</div>
</div>);
      </main>
    </>
  );
};

export default ExperiencePage;