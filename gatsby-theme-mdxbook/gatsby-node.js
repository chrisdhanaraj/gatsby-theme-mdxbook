const path = require("path");
const _ = require("lodash");
const fs = require("fs");
const { createUrlPath, getFileName } = require("./utils/url");

const ignoreFiles = ["/readme", "/summary"];

exports.createPages = ({ graphql, actions }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMdx {
              edges {
                node {
                  id
                  fields {
                    relativePath
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.error(result.errors);
          reject(result.errors);
        }

        // if (fs.existsSync(`${process.cwd()}/docs/config.json`))
        const config = require(`${process.cwd()}/docs/config.json`);

        result.data.allMdx.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.relativePath,
            component: path.resolve(
              `/${__dirname}/src/templates/Layout/Layout.js`
            ),
            context: {
              id: node.id,
              tableOfContents: config.tableOfContents
            }
          });
        });
      })
    );
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "Mdx") {
    const parent = getNode(node.parent);
    const filename = getFileName(node.fileAbsolutePath);
    const slug = node.frontmatter.slug || _.kebabCase(filename);

    const relativePath = createUrlPath(node.fileAbsolutePath, slug);
    const relativeDirectory = parent.relativeDirectory;

    createNodeField({
      name: "title",
      node,
      value: node.frontmatter.title || _.startCase(filename)
    });

    createNodeField({
      name: "relativePath",
      node,
      value: relativePath
    });

    createNodeField({
      name: "relativeDirectory",
      node,
      value: relativeDirectory
    });
  }
};
