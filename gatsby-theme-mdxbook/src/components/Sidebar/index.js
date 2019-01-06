import React from 'react';
import { Link } from 'gatsby';
import './sidebar.css';

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
  const relativePath =
    location.pathname === '/' ? location.pathname : location.pathname.slice(1);

  const content = navConfig.reduce((content, item) => {
    if (item.children && item.header) {
      content.push(
        <li className="sidebar-nav__item sidebar-nav__header">
          <strong>{item.header}</strong>
        </li>
      );

      item.children.forEach(childItem => {
        const className = `sidebar-nav__item ${
          childItem.relativePath === relativePath
            ? 'sidebar-nav__item--active'
            : ''
        }`;

        content.push(
          <li>
            <Link className={className} to={childItem.relativePath}>
              {childItem.label}
            </Link>
          </li>
        );
      });
    } else {
      const className = `sidebar-nav__item ${
        item.relativePath === relativePath ? 'sidebar-nav__item--active' : ''
      }`;

      content.push(
        <li>
          <Link className={className} to={item.relativePath}>
            {item.label}
          </Link>
        </li>
      );
    }

    return content;
  }, []);

  return (
    <div className="sidebar">
      <ul className="sidebar-nav">{content}</ul>
    </div>
  );
};

export default Sidebar;
