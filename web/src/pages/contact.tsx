import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';

// 社交媒体数据
const socialMedia = [
  {
    name: '微信',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.295a.328.328 0 0 0 .165-.054l1.903-1.114a.864.864 0 0 1 .275-.084.786.786 0 0 1 .201.027 10.73 10.73 0 0 0 3.08.445c.21 0 .417-.006.626-.018-.258-.588-.402-1.22-.402-1.883 0-2.579 2.458-4.79 5.689-4.79.218 0 .432.012.642.036C14.816 7.232 12.306 5.1 8.691 5.1c-.233 0-.466.012-.695.034l-.127.013a.707.707 0 0 1-.172.015.849.849 0 0 1-.417-.12L4.898 3.959a.203.203 0 0 0-.097-.025.188.188 0 0 0-.181.186c0 .034.007.067.02.099l.457 1.644a.48.48 0 0 1-.161.478C3.391 7.58 2.546 8.953 2.546 10.48c0 2.135 1.727 3.986 4.246 4.916.14.049.29.094.442.137.23.065.463.126.7.18 1.555.357 3.082.357 4.637 0 .238-.054.472-.115.701-.18.152-.043.301-.088.442-.137 2.518-.93 4.246-2.78 4.246-4.916 0-1.528-.845-2.9-2.392-4.139a.48.48 0 0 1-.162-.478l.458-1.644a.188.188 0 0 0-.161-.284.203.203 0 0 0-.097.025L13.224 5.03a.849.849 0 0 1-.417.12.707.707 0 0 1-.172-.015l-.127-.013c-.23-.022-.462-.034-.695-.034-3.615 0-6.125 2.133-6.456 4.954.21-.024.425-.036.642-.036 3.231 0 5.689 2.211 5.689 4.79 0 .663-.144 1.295-.401 1.883.208.012.415.018.626.018 1.05 0 2.082-.15 3.08-.445a.786.786 0 0 1 .2-.027.864.864 0 0 1 .275.084l1.903 1.114a.328.328 0 0 0 .166.054c.16 0 .289-.132.289-.295 0-.072-.028-.143-.048-.213l-.39-1.48a.59.59 0 0 1 .213-.664c1.832-1.348 3.002-3.339 3.002-5.55 0-4.055-3.89-7.343-8.691-7.343" />
      </svg>
    ),
    handle: 'hugh_aix',
    color: 'bg-green-500',
    link: '#',
  },
  {
    name: '知乎',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.721 0C2.251 0 0 2.25 0 5.719V18.28C0 21.751 2.252 24 5.721 24h12.56C21.751 24 24 21.75 24 18.281V5.72C24 2.249 21.75 0 18.281 0zm1.5 4.875h8.798c.33 0 .599.268.601.599 0 .33-.271.6-.601.6h-2.486c.44.621.784 1.309 1.029 2.053h1.525c.33 0 .599.268.599.599 0 .33-.269.6-.599.6h-1.113c.121.465.188.952.2 1.449.63.33-.205.621-.532.66-.33.04-.66-.2-.7-.53-.06-.369-.103-.733-.188-1.08-.242-.982-.682-1.908-1.316-2.752h-.331c-.44.621-.785 1.309-1.03 2.053h1.113c.33 0 .599.268.599.599 0 .33-.269.6-.599.6h-.701c-.09.465-.15.952-.15 1.449 0 .33-.271.599-.601.599-.33 0-.6-.269-.6-.599 0-.497.061-.984.15-1.449h-2.002c-.09.465-.151.952-.151 1.449 0 .33-.27.599-.6.599-.33 0-.6-.269-.6-.599 0-.497.06-.984.15-1.449h-.7c-.331 0-.601-.27-.601-.6 0-.331.27-.599.601-.599h1.112c.242-.744.59-1.432 1.03-2.053h-.331c-.634.844-1.074 1.77-1.317 2.752-.09.347-.15.711-.19 1.08-.04.33-.37.57-.7.53-.33-.039-.57-.33-.53-.66.012-.497.08-.984.2-1.449h-1.114c-.33 0-.6-.27-.6-.6 0-.331.27-.599.6-.599h1.526c.242-.744.59-1.432 1.03-2.053H7.221c-.33 0-.6-.27-.6-.6 0-.331.27-.599.6-.599zm-.9 7.2h11.4c.33 0 .6.27.6.6 0 .331-.27.6-.6.6h-4.527c.165.63.392 1.22.676 1.772.211.39.09.869-.3 1.08-.391.21-.87.09-1.08-.301-.285-.54-.511-1.12-.676-1.729-.18.659-.436 1.288-.767 1.877-.18.33-.6.45-.93.27-.33-.18-.45-.6-.27-.93.36-.659.631-1.378.811-2.128.03-.15.06-.3.09-.45.06-.27.3-.45.57-.45h.03c.3.03.54.271.54.571v.029c0 .15-.03.3-.06.45h4.887c-.06-.21-.12-.42-.15-.63h-9.623c-.33 0-.6-.269-.6-.6 0-.33.27-.6.6-.6zm5.37 3.6c.33 0 .6.269.6.6v3c0 .33-.27.6-.6.6-.33 0-.6-.27-.6-.6v-3c0-.331.27-.6.6-.6z" />
      </svg>
    ),
    handle: 'hugh_aix',
    color: 'bg-blue-600',
    link: 'https://www.zhihu.com/',
  },
  {
    name: '微博',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.737 5.439l-.002.004zM9.05 17.219c-.384.616-1.208.884-1.829.602-.612-.279-.793-.991-.406-1.593.379-.595 1.176-.861 1.793-.601.622.263.82.972.442 1.592zm1.27-1.627c-.141.237-.449.353-.689.253-.236-.09-.313-.361-.177-.586.138-.227.436-.346.672-.24.239.09.315.36.18.601l.014-.028zm.176-2.719c-1.893-.493-4.033.45-4.857 2.118-.836 1.704-.026 3.591 1.886 4.21 1.983.64 4.318-.341 5.132-2.179.8-1.793-.201-3.642-2.161-4.149zm7.563-1.224c-.346-.105-.57-.18-.405-.615.375-.615.42-1.148.006-1.547-.781-.75-2.912-.708-5.364.045 0 0-.766.331-.57-.271.375-1.199.315-2.211-.27-2.786-1.305-1.29-4.786.045-7.755 2.996C1.344 11.932 0 14.073 0 15.927c0 3.556 4.56 5.716 9.02 5.716 5.843 0 9.747-3.405 9.747-6.102 0-1.635-1.395-2.559-2.617-2.936l-.004-.006zM20.783 6.362c-.781-.885-1.93-1.22-2.996-.991.435-.016.766-.406.766-.826 0-.449-.36-.811-.81-.811l-.03.002h-.09c-1.077.12-1.908.811-2.082 1.86-.06.391.09.766.36 1.062.271.3.646.421 1.006.361.961-.165 1.996.165 2.697 1.021.705.856.9 2.022.601 3.04v.029c-.12.391.12.781.48.93.36.15.78-.06.93-.42.511-1.561.18-3.34-.832-4.252v-.005zm2.52-2.281c-1.591-1.801-3.931-2.487-6.091-2.022.495-.045.856-.511.856-1.021s-.391-.93-.885-.93h-.03c-1.441.164-2.539 1.154-2.539 2.456 0 .525.195 1.021.586 1.381.39.36.9.51 1.396.42 1.863-.27 3.873.27 5.236 1.801 1.365 1.546 1.731 3.661 1.141 5.507v.03c-.165.48.105 1.006.586 1.171.48.165 1.005-.105 1.17-.585.84-2.596.315-5.551-1.426-7.208z" />
      </svg>
    ),
    handle: 'hugh_aix',
    color: 'bg-red-500',
    link: 'https://weibo.com/',
  },
  {
    name: 'GitHub',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    handle: 'hugh_aix',
    color: 'bg-gray-800',
    link: 'https://github.com/',
  },
  {
    name: '邮箱',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    ),
    handle: 'contact@hughaix.com',
    color: 'bg-purple-600',
    link: 'mailto:contact@hughaix.com',
  },
];

const Contact: NextPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Head>
        <title>联系我 | HUGH·Aix</title>
        <meta name="description" content="联系HUGH·Aix，了解更多关于我的信息和合作机会" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden">
        {/* 3D装饰元素 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-20 w-80 h-80 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-20 w-80 h-80 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-4xl w-full z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              联系我
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              无论是项目合作、咨询交流还是其他事宜，都欢迎通过以下方式联系我
            </p>
          </motion.div>

          <div className="grid grid-cols-1  gap-8">
            {/* 联系卡片 */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">社交媒体</h2>
                <div className="space-y-4">
                  {socialMedia.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      whileHover={{ scale: 1.03 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      <div className={`${social.color} p-3 rounded-full text-white mr-4`}>
                        {social.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{social.name}</p>
                        <p className="text-base font-semibold text-gray-900 dark:text-white">{social.handle}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 联系表单 */}
            {/* <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform perspective-1000"
              style={{ 
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">发送消息</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="name">
                      您的姓名
                    </label>
                    <input
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      id="name"
                      type="text"
                      placeholder="请输入您的姓名"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">
                      您的邮箱
                    </label>
                    <input
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      id="email"
                      type="email"
                      placeholder="请输入您的邮箱"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="message">
                      您的消息
                    </label>
                    <textarea
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      id="message"
                      rows={4}
                      placeholder="请输入您想说的内容..."
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    type="button"
                  >
                    发送消息
                  </motion.button>
                </form>
              </div>
            </motion.div> */}
          </div>

          {/* 位置信息 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-600 dark:text-gray-400">
              <span className="inline-block mr-2">
                <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </span>
              杭州市，中国
            </p>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </>
  );
};

export default Contact;