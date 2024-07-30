// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-preset-env')({
      stage: 1,
      features: {
        'custom-properties': false,
      },
    }),
    require('autoprefixer'),
  ],
};
