// adding filter for the timestamp on the blog section
const { DateTime } = require("luxon");
const CleanCSS = require("clean-css");
const { minify } = require("terser");
const { minify: htmlMinify } = require("html-minifier-terser");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig){
  // File hash cache for asset versioning
  const fileHashCache = new Map();
  
  // Function to get MD5 hash of a file
  function getFileHash(filePath) {
    if (fileHashCache.has(filePath)) {
      return fileHashCache.get(filePath);
    }
    
    try {
      const fullPath = path.join('./src', filePath);
      if (fs.existsSync(fullPath)) {
        const fileBuffer = fs.readFileSync(fullPath);
        const hash = crypto.createHash('md5').update(fileBuffer).digest('hex').substring(0, 8);
        fileHashCache.set(filePath, hash);
        return hash;
      }
    } catch (err) {
      console.warn(`Could not hash file ${filePath}:`, err.message);
    }
    
    // Fallback to timestamp if file hash fails
    return Date.now().toString().substring(-8);
  }

  // Add asset filter for cache busting with MD5 hashes
  eleventyConfig.addFilter("asset", function(assetPath) {
    const hash = getFileHash(assetPath);
    return `${assetPath}?v=${hash}`;
  });

  // Image optimization function
  async function imageShortcode(src, alt, className = "", sizes = "100vw", loading = "lazy", fetchpriority = "") {
    if (!src) {
      throw new Error(`Missing \`src\` on image from: ${src}`);
    }

    // Handle absolute paths by making them relative to src folder
    let imageSrc = src;
    if (src.startsWith('/assets/')) {
      imageSrc = `./src${src}`;
    } else if (!src.startsWith('./')) {
      imageSrc = `./src/assets/${src}`;
    }

    const metadata = await Image(imageSrc, {
      widths: [300, 600, 900, 1200, "auto"], // Generate multiple sizes + original
      formats: ["avif", "webp", "auto"], // AVIF first for LCP optimization
      outputDir: "./public/assets/images/",
      urlPath: "/assets/images/",
      sharpOptions: {
        quality: 85,
        progressive: true
      }
    });

    const imageAttributes = {
      alt,
      class: className,
      sizes,
      loading,
      decoding: "async",
    };

    // Add fetchpriority if specified
    if (fetchpriority) {
      imageAttributes.fetchpriority = fetchpriority;
    }

    return Image.generateHTML(metadata, imageAttributes);
  }

  // Logo-specific optimization (smaller sizes)
  async function logoShortcode(src, alt, className = "logo") {
    let imageSrc = src;
    if (src.startsWith('/assets/')) {
      imageSrc = `./src${src}`;
    }

    const metadata = await Image(imageSrc, {
      widths: [100], // Single width to preserve aspect ratio
      formats: ["avif", "webp", "auto"],
      outputDir: "./public/assets/images/",
      urlPath: "/assets/images/",
      sharpOptions: {
        quality: 90
      }
    });

    const imageAttributes = {
      alt,
      class: className,
      loading: "eager", // Logo should load immediately
      decoding: "async",
    };

    return Image.generateHTML(metadata, imageAttributes);
  }

  // Register shortcodes
  eleventyConfig.addShortcode("image", imageShortcode);
  eleventyConfig.addShortcode("logo", logoShortcode);
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
  eleventyConfig.addPassthroughCopy('./src/_headers');
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
