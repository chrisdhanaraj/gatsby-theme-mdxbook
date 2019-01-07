import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import MainContent from '../../components/MainContent';
import { convertHtmlToTree } from '../../../utils/dirTree';
import { resolveNavTree } from '../../../utils/resolveNavTree';
import './normalize.css';
import './layout.css';

export default class DefaultTemplate extends Component {
  render() {
    console.log(this.props);
    const {
      location,
      data: {
        pageDetails: {
          parent: { modifiedTime },
          fields: { title },
        },
        summaryPage,
        allMdx,
      },
      pageContext: { rootPath },
    } = this.props;

    const summaryExists = summaryPage !== null;

    // if (summaryExists) {
    const { sidebarTree } = convertHtmlToTree(summaryPage.html);
    const navConfig = resolveNavTree(sidebarTree, allMdx.edges, rootPath);

    // }

    return (
      <div className="container">
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Header />
        <main className="main">
          <Sidebar
            location={location}
            summaryExists={summaryExists}
            navConfig={navConfig}
          />
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
    summaryPage: mdx(fields: { relativePath: { eq: "summary" } }) {
      html
    }
    allMdx {
      edges {
        node {
          id
          fields {
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
`;
