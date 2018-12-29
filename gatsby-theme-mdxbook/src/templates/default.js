import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default class DefaultTemplate extends Component {
  render() {
    const {
      location,
      data: {
        mdx: {
          code: { body },
        },
      },
    } = this.props;

    return (
      <Fragment>
        <Helmet>
          <title>Hi</title>
        </Helmet>
        <Header />
        <main>
          <Sidebar location={location} />
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
    mdx(id: { eq: $id }) {
      code {
        body
      }
    }
  }
`;
