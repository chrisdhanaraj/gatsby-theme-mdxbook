import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { convertHtmlToTree } from '../../utils/dirTree';
import { resolveNavTree } from '../../utils/resolveNavTree';

export default class DefaultTemplate extends Component {
  render() {
    console.log(this.props);
    const {
      location,
      data: {
        pageDetails: {
          fields: { title },
          code: { body },
        },
        summaryPage,
        allMdx,
      },
      pageContext: { rootPath },
    } = this.props;

    const summaryExists = summaryPage !== null;
    console.log(this.props.data);

    // if (summaryExists) {
    const { sidebarTree } = convertHtmlToTree(summaryPage.html);
    const navConfig = resolveNavTree(sidebarTree, allMdx.edges, rootPath);

    // }

    return (
      <Fragment>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Header />
        <main>
          <Sidebar
            location={location}
            summaryExists={summaryExists}
            navConfig={navConfig}
          />
          <div className="content">
            <MDXRenderer>{body}</MDXRenderer>
          </div>
        </main>
      </Fragment>
    );
  }
}

export const pageQuery = graphql`
  query($id: String!) {
    pageDetails: mdx(id: { eq: $id }) {
      fields {
        title
      }
      code {
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
