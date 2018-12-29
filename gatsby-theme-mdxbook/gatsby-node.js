const componentWithMDXScope = require('gatsby-mdx/component-with-mdx-scope');
const path = require('path');
const _ = require('lodash');
const fs = require('fs');
const gatsbyConfig = require('./gatsby-config');

const { createUrlPath, getFileName } = require('./utils/url');

const SUMMARY_EXISTS = gatsbyConfig.siteMetadata.summaryExists;

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  if (SUMMARY_EXISTS) {
    // mdx query the file
    // get html
    // build file tree
    // with file tree, get mdx for specific files and create those pages
    // just always create the pages, don't let them get navigated to?
  }

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
                    title
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
            },
          });
        });
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
