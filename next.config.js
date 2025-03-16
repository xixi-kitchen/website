/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 优化资源加载
  experimental: {
    optimizeCss: true,
    optimizeImages: true,
    scrollRestoration: true,
  },
  // 配置资源域名
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
  },
  // 配置 webpack
  webpack: (config, { dev, isServer }) => {
    // 优化 GLB 模型加载
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
    });

    // 优化 HDR 贴图加载
    config.module.rules.push({
      test: /\.hdr$/,
      type: 'asset/resource',
    });

    // 生产环境优化
    if (!dev && !isServer) {
      // 启用 gzip 压缩
      config.optimization.minimize = true;
      
      // 分块策略优化
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          // 3D 资源单独分块
          threejs: {
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            name: 'threejs',
            chunks: 'all',
            priority: 10,
          },
        },
      };
    }

    return config;
  },
  // 配置 headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/models/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/moderimages/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig 