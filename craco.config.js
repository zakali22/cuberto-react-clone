const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@sections": path.resolve(__dirname, "src/sections"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@images": path.resolve(__dirname, "src/images"),
      "@lib": path.resolve(__dirname, "src/lib"),
    },
  },
};