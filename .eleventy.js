// adding filter for the timestamp on the blog section
const { DateTime } = require("luxon");
const CleanCSS = require("clean-css");
const { minify } = require("terser");
const { minify: htmlMinify } = require("html-minifier-terser");

module.exports = function(eleventyConfig){
  // CSS minification
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // JavaScript minification
  eleventyConfig.addFilter("jsmin", async function(code) {
    try {
      const minified = await minify(code);
      return minified.code;
    } catch (err) {
      console.error("JS minification failed:", err);
      return code;
    }
  });

  // HTML minification
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      return htmlMinify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false,
        minifyCSS: true,
        minifyJS: true
      });
    }
    return content;
  });

  // Process CSS files
  eleventyConfig.addTemplateFormats("css");
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async function(inputContent) {
      return async () => {
        return new CleanCSS({}).minify(inputContent).styles;
      };
    }
  });

  eleventyConfig.addPassthroughCopy('./src/assets');
  eleventyConfig.addPassthroughCopy('./src/admin');
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).
      toLocaleString(DateTime.DATE_MED);
    }
  )
  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "public"
      
    }
  }
}
