import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  const isChinaServer = process.env.NEXT_PUBLIC_IS_CHINA_SERVER === 'true';
  const icpNumber = process.env.NEXT_PUBLIC_ICP_NUMBER;
  const psbNumber = process.env.NEXT_PUBLIC_PSB_NUMBER;
  const psbCode = process.env.NEXT_PUBLIC_PSB_CODE;

  return (
    <footer className="bg-white dark:bg-black shadow">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-black dark:text-white text-sm">
          &copy; {new Date().getFullYear()} HUGH·Aix. 版权所有.
        </p>
        
        {/* 备案信息 */}
        {isChinaServer && (
          <div className="text-center text-sm mt-2 flex justify-center items-center gap-4">
            {/* ICP备案信息 */}
            {icpNumber && (
              <a
                href="https://beian.miit.gov.cn/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              >
                备案号：{icpNumber}
              </a>
            )}
            
            {/* 公安备案信息 */}
            {psbNumber && psbCode && (
              <a
                href={`http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${psbCode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 inline-flex items-center"
              >
                <Image 
                  src="/beian.png" 
                  alt="公安备案图标" 
                  width={16}
                  height={16}
                  className="mr-1"
                />
                {psbNumber}
              </a>
            )}
          </div>
        )}

        {/* 开发环境指示器 */}
        {process.env.NODE_ENV === 'development' && (
          <div className="text-xs text-gray-400 mt-2 text-center">
            当前环境: {isChinaServer ? '中国服务器' : '海外服务器'}<br />
            ICP备案: {icpNumber || '未设置'}<br />
            公安备案: {psbNumber || '未设置'}
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;