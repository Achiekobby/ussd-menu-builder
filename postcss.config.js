module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-preset-env')({
      stage: 1, // Adjust as needed
      features: {
        'custom-properties': true, // Enable custom properties if needed
      },
    }),
    require('autoprefixer'),
    require('postcss-calc')({
      // Adjust options to bypass or fix issues
      // If needed, disable problematic calculations
    }),
  ],
};