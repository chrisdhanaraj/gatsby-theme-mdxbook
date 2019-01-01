const componentWithMDXScope = require('gatsby-mdx/component-with-mdx-scope');
const path = require('path');
const _ = require('lodash');
const fs = require('fs');

const { createUrlPath, getFileName } = require('./utils/url');
const { convertHtmlToTree } = require('./utils/dirTree');
const { resolveNavTree } = require('./utils/resolveNavTree');

const SUMMARY_EXISTS = fs.existsSync(`${process.cwd()}/docs/SUMMARY.md`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            mdx(fields: { relativePath: { eq: "summary" } }) {
              html
            }
            allMdx {
              edges {
                node {
                  id
                  fields {
                    slug
                    relativePath
                  }
                  fileAbsolutePath
                  code {
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

        if (SUMMARY_EXISTS) {
          const html = result.data.mdx.html;
          const { allPages, sidebarTree } = convertHtmlToTree(html);
          const navTree = resolveNavTree(sidebarTree, result.data.allMdx.edges);

          const absolutePaths = allPages.map(
            page => `${process.cwd()}/docs/${page}`
          );

          result.data.allMdx.edges
            .filter(({ node }) => {
              return (
                node.fields.relativePath === '/' ||
                absolutePaths.includes(node.fileAbsolutePath)
              );
            })
            .forEach(({ node }) => {
              createPage({
                path: node.fields.relativePath,
                component: componentWithMDXScope(
                  path.resolve(`${__dirname}/src/templates/default.js`),
                  node.code.scope,
                  process.cwd()
                ),
                context: {
                  id: node.id,
                  rootPath: process.cwd(),
                },
              });
            });
        } else {
          // Create blog posts pages.
          result.data.allMdx.edges.forEach(({ node }) => {
            createPage({
              path: node.fields.relativePath,
              component: componentWithMDXScope(
                path.resolve(`${__dirname}/src/templates/default.js`),
                node.code.scope,
                process.cwd()
              ),
              context: {
                id: node.id,
                summaryExists: SUMMARY_EXISTS,
                sidebarTree: null,
              },
            });
          });
        }
      })
    );
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    const parent = getNode(node.parent);

    const filename = getFileName(node.fileAbsolutePath);
    const slug = node.frontmatter.slug || _.kebabCase(filename);
    const relativePath = createUrlPath(node.fileAbsolutePath, slug);
    const relativeDirectory = parent.relativeDirectory;

    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.title || _.startCase(filename),
    });

    createNodeField({
      name: 'slug',
      node,
      value: slug,
    });

    createNodeField({
      name: 'relativePath',
      node,
      value: relativePath,
    });

    createNodeField({
      name: 'relativeDirectory',
      node,
      value: relativeDirectory,
    });
  }
};
