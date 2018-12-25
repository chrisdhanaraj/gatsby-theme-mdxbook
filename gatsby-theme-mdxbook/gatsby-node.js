const componentWithMDXScope = require('gatsby-mdx/component-with-mdx-scope');
const path = require('path');
const _ = require('lodash');

const { createUrlPath } = require('./utils/url');

exports.createPages = ({ graphql, actions }) => {
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
                  fileAbsolutePath
                  frontmatter {
                    title
                  }
                  code {
                    body
                    scope
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors); // eslint-disable-line no-console
          reject(result.errors);
        }

        // Create blog posts pages.
        result.data.allMdx.edges.forEach(({ node }) => {
          createPage({
            path: createUrlPath(node.fileAbsolutePath, node.frontmatter.slug),
            component: componentWithMDXScope(
              path.resolve(`${__dirname}/src/templates/default.js`),
              node.code.scope,
              process.cwd()
            ),
            context: {
              id: node.id,
              title:
                node.frontmatter.title ||
                _.startCase(
                  node.fileAbsolutePath.slice(
                    node.fileAbsolutePath.lastIndexOf('/') + 1,
                    node.fileAbsolutePath.lastIndexOf('.')
                  )
                ),
            },
          });
        });
      })
    );
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  console.log(node.internal.type);
};
