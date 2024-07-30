// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-preset-env')({
      stage: 1,
      features: {
        'custom-properties': true,
      },
    }),
    require('autoprefixer'),
    require('postcss-calc')({
      // Adjust options or disable problematic calculations
      // Example: disable calculations with nested calc() functions
      // This might not be ideal but helps in identifying the issue
    }),
  ],
};
