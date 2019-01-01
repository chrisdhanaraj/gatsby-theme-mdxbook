import React from 'react';
import { Link } from 'gatsby';

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

const Sidebar = ({ location, summaryExists, navConfig }) => {
  const content = navConfig.reduce((content, item) => {
    if (item.children && item.header) {
      content.push(
        <li>
          <strong>{item.header}</strong>
        </li>
      );

      item.children.forEach(childItem => {
        content.push(
          <Link to={childItem.relativePath}>{childItem.label}</Link>
        );
      });
    } else {
      content.push(<Link to={item.relativePath}>{item.label}</Link>);
    }

    return content;
  }, []);

  return <div className="sidebar">{content}</div>;
};

export default Sidebar;
