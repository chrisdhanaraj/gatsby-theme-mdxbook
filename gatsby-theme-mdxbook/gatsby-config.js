const path = require("path");

module.exports = {
  siteMetadata: {
    title: "MDXBook",
    description: "MDXBook",
    author: "@chrisdhanaraj"
  },
  plugins: [
    {
      resolve: `gatsby-mdx`,
      mediaTypes: ["text/markdown", "text/x-markdown"]
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "docs",
        path: `${process.cwd()}/docs/`
      }
    },
    "gatsby-plugin-react-helmet"
  ]
};
