import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

const constructDirTree = nodeArr => {
  const flattened = nodeArr
    .map(node => {
      return node.node.fields;
    })
    .reduce((dirTree, node) => {
      const { relativeDirectory } = node;

      if (relativeDirectory === '') {
        dirTree['root'] = dirTree['root'] || [];
        dirTree['root'].push(node);
      } else {
        dirTree[relativeDirectory] = dirTree[relativeDirectory] || [];
        dirTree[relativeDirectory].push(node);
      }

      return dirTree;
    }, {});

  return flattened;
};

// -------------------------------
// IF the SUMMARY.md file exists
//  THEN query that file and use the shared util to get the folder structure
// ELSE
//  Query all mdx files and loop through the directory tree there

const Sidebar = ({ location }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              summaryExists
            }
          }
          allMdx {
            edges {
              node {
                fields {
                  slug
                  title
                  relativePath
                  relativeDirectory
                }
              }
            }
          }
        }
      `}
      render={({ site, allMdx }) => {
        const {
          siteMetadata: { summaryExists },
        } = site;
        const dirTree = constructDirTree(allMdx.edges);

        console.log(summaryExists);

        return <p>Hi</p>;
      }}
    />
  );
};

export default Sidebar;
