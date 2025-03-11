import React from 'react';
import Head from 'next/head';

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
}

const experiences: Experience[] = [
  {
    title: '职位名称',
    company: '公司名称',
    period: '2022 - 现在',
    description: [
      '负责项目的架构设计和技术选型',
      '带领团队完成多个重要项目的开发',
      '优化开发流程，提高团队效率',
    ],
    skills: ['React', 'TypeScript', 'Node.js'],
  },
  // 可以添加更多经历
];

const ExperiencePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>经历 | HUGH·Aix</title>
        <meta name="description" content="我的职业经历和项目经验" />
      </Head>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          职业经历
        </h1>
        
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {exp.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
                </div>
                <span className="text-gray-500 dark:text-gray-400">{exp.period}</span>
              </div>
              
              <ul className="list-disc list-inside mb-4 space-y-2">
                {exp.description.map((item, i) => (
                  <li key={i} className="text-gray-700 dark:text-gray-300">
                    {item}
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default ExperiencePage; 