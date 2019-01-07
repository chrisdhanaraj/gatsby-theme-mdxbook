import React from 'react';
import { kebabCase } from 'lodash';
import classnames from 'classnames';
import './document-navigation.css';

const DocumentNavigation = ({ headings }) => {
  const lowestDepth = headings.reduce((lowestDepth, node) => {
    if (lowestDepth > node.depth || lowestDepth === null) {
      lowestDepth = node.depth;
    }

    return lowestDepth;
  }, null);

  const headingTree = headings.filter(node => {
    return node.depth === lowestDepth || node.depth === lowestDepth + 1;
  });

  return (
    <div className="document-container">
      <nav className="document-navigation">
        <strong className="document-navigation__heading">CONTENTS</strong>
        <ul className="document-navigation-list">
          {headingTree.map(node => {
            const alphanumericValue = node.value.replace(/[^a-zA-Z\d\s]/g, '');

            const className = classnames('document-navigation-list__item', {
              'document-navigation-list__item--depth-0':
                node.depth % lowestDepth === 0,
              'document-navigation-list__item--depth-1':
                node.depth % lowestDepth !== 0,
            });
            return (
              <li className={className}>
                <a href={`#${kebabCase(alphanumericValue)}`}>
                  <span>{node.value}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default DocumentNavigation;
