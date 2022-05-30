/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['three'])

module.exports = {
  withTM,
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader'],
    })

    return config
  },
  images: {
    domains: ['images.unsplash.com'],
  },
}
