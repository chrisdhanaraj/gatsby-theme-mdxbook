import React from 'react';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import { distanceInWordsToNow } from 'date-fns';
import './document.css';

const Document = ({ title, modifiedTime, mdxDetails }) => {
  return (
    <div className="document">
      <header className="document-header-container">
        <div className="document-header-content">
          <h1 className="document-header">{title}</h1>
          <span className="last-modified">
            Last updated{' '}
            {distanceInWordsToNow(new Date(modifiedTime), { addSuffix: true })}
          </span>
        </div>
      </header>
      <MDXRenderer>{mdxDetails.body}</MDXRenderer>
    </div>
  );
};

export default Document;

// I love you.
// <3 Tayler
