import type { NextPage } from 'next';

const About: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">关于我们</h1>
      <div className="w-full max-w-2xl bg-white p-8 rounded shadow-md">
        <p className="text-gray-700 text-lg mb-4">
          我们是一家致力于提供优质服务的公司。我们的团队由经验丰富的专业人士组成，致力于为客户提供最佳的解决方案。
        </p>
        <p className="text-gray-700 text-lg mb-4">
          我们的使命是通过创新和卓越的服务，帮助客户实现他们的目标。我们相信，通过与客户的紧密合作，我们可以共同创造美好的未来。
        </p>
        <p className="text-gray-700 text-lg">
          如果您有任何问题或需要进一步的信息，请随时与我们联系。我们期待与您的合作！
        </p>
      </div>
    </div>
  );
};

export default About;