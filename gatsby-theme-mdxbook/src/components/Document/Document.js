import React from "react";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { MDXProvider } from "@mdx-js/react";
import { distanceInWordsToNow } from "date-fns";
import AutoLinkedHeading from "../Text/Heading";
import Code from '../Code/Code';
import "./document.css";

const Document = ({ title, modifiedTime, mdxDetails }) => {
  return (
    <MDXProvider
      components={{
        h1: props => <AutoLinkedHeading size="h1" {...props} />,
        h2: props => <AutoLinkedHeading size="h2" {...props} />,
        h3: props => <AutoLinkedHeading size="h3" {...props} />,
        h4: props => <AutoLinkedHeading size="h4" {...props} />,
        h5: props => <AutoLinkedHeading size="h5" {...props} />,
        h6: props => <AutoLinkedHeading size="h6" {...props} />,
        ul: props => <ul {...props} className="markdown-list" />,
        code: props => <Code {...props} />
      }}
    >
      <div className="document">
        <header className="document-header-container">
          <div className="document-header-content">
            <h1 className="document-header">{title}</h1>
            <span className="last-modified">
              Last updated{" "}
              {distanceInWordsToNow(new Date(modifiedTime), {
                addSuffix: true
              })}
            </span>
          </div>
        </header>
        <MDXRenderer>{mdxDetails.body}</MDXRenderer>
      </div>
    </MDXProvider>
  );
};

export default Document;
