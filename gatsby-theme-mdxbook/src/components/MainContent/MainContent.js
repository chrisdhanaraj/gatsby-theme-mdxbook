import React from 'react';
import Document from '../Document';
import DocumentNavigation from '../DocumentNavigation';
import './main-content.css';

const MainContent = ({ title, modifiedTime, pageDetails, allMdx }) => {
  return (
    <div className="content">
      <Document
        mdxDetails={pageDetails.code}
        title={title}
        modifiedTime={modifiedTime}
      />

      <DocumentNavigation headings={pageDetails.headings} />
    </div>
  );
};

export default MainContent;
