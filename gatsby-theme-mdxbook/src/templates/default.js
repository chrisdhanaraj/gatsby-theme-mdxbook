import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

export default class DefaultTemplate extends Component {
  render() {
    console.log(this.props.data)
    const {
      data: {
        mdx: {
          code: { body },
        },
      },
    } = this.props

    return (
      <div>
        <h1>Default Template</h1>

        <MDXRenderer>{body}</MDXRenderer>
      </div>
    )
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
`
