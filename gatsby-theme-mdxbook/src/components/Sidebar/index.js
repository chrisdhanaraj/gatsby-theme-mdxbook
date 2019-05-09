import React from "react";
import { Link } from "gatsby";
import "./sidebar.css";

// -------------------------------
// IF the SUMMARY.md file exists
//  THEN query that file and use the shared util to get the folder structure
// ELSE
//  Query all mdx files and loop through the directory tree there

const Sidebar = ({ location, tableOfContents }) => {
  const relativePath =
    location.pathname === "/" ? location.pathname : location.pathname.slice(1);

  const content = tableOfContents.reduce(
    (content, item) => {
      content.push(
        <li key={item.header} className="sidebar-nav__item sidebar-nav__header">
          <strong>{item.header}</strong>
        </li>
      );

      if (item.links && item.links.length > 0) {
        item.links.forEach(childItem => {
          const className = `sidebar-nav__item ${
            childItem.href === relativePath ? "sidebar-nav__item--active" : ""
          }`;

          content.push(
            <li key={childItem.href}>
              <Link className={className} to={childItem.href}>
                {childItem.label}
              </Link>
            </li>
          );
        });
      }

      return content;
    },
    [
      <li>
        <Link
          key="home"
          className={`sidebar-nav__item ${
            "/" === relativePath ? "sidebar-nav__item--active" : ""
          }`}
          to={"/"}
        >
          Home
        </Link>
      </li>
    ]
  );

  return (
    <div className="sidebar">
      <ul className="sidebar-nav">{content}</ul>
    </div>
  );
};

export default Sidebar;
