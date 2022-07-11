const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const { i18n } = require('./next-i18next.config');
module.exports = withPWA({
  reactStrictMode: true,
  i18n,
  pwa: {
    disable: process.env.NODE_ENV !== 'production',
    dest: 'public',
    runtimeCaching,
  },
  images: {
    domains: [
      'pickbazarlaravel.s3.ap-southeast-1.amazonaws.com',
      'lh3.googleusercontent.com',
      'localhost',
      '127.0.0.1',
    ],
  },
  ...(  process.env.NEXT_PUBLIC_VENDURE_LOCAL_URL && {
    source: `${process.env.NEXT_PUBLIC_VENDURE_LOCAL_URL}/:vendure-shop-api`,
    destination: `${process.env.NEXT_PUBLIC_VENDURE_SHOP_API_URL}/:http://localhost:3000/shop-api`} && {
    webpack(config, options) {
      config.module.rules.push({
        test: /\.graphql$/,
        exclude: /node_modules/,
        use: [options.defaultLoaders.babel, { loader: 'graphql-let/loader' }],
      });

      config.module.rules.push({
        test: /\.ya?ml$/,
        type: 'json',
        use: 'yaml-loader',
      });

      return config;
    },
   
  }),
  typescript: {
    ignoreBuildErrors: true,
  },
});
