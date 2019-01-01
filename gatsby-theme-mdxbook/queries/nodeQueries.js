const allMdxFiles = `
{
  mdx(fields: { relativePath: { eq: "summary" } }) {
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
