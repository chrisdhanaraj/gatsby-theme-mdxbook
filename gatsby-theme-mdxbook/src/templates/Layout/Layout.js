import React, { Component } from "react";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import MainContent from "../../components/MainContent";
import "./normalize.css";
import "./layout.css";

export default class DefaultTemplate extends Component {
  render() {
    const {
      location,
      data: {
        pageDetails: {
          parent: { modifiedTime },
          fields: { title }
        }
      },
      pageContext: { tableOfContents }
    } = this.props;

    console.log(this.props.pageContext);

    return (
      <div className="container">
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Header />
        <main className="main">
          <Sidebar location={location} tableOfContents={tableOfContents} />
          <MainContent
            title={title}
            modifiedTime={modifiedTime}
            pageDetails={this.props.data.pageDetails}
          />
        </main>
      </div>
    );
  }
}

export const pageQuery = graphql`
  query($id: String!) {
    pageDetails: mdx(id: { eq: $id }) {
      parent {
        ... on File {
          modifiedTime
        }
      }
      fields {
        title
      }
      headings {
        value
        depth
      }
      code {
        scope
        body
      }
    }
    summaryPage: mdx(fields: { title: { eq: "summary" } }) {
      html
    }
    allMdx {
      edges {
        node {
          id
          fields {
            title
            relativePath
            relativeDirectory
          }
        }
      }
    }
  }
`;
