### gatsby-theme-mdxbook

A Gatsby theme designed to replicate the Gitbook reading experience, but with all the power of Gatsby development instead.

Required

- README.md

Optional

- SUMMARY.md - If provided, will be used to generate the table of contents (sidebar) of the site. Otherwise, will infer from directory structure.

### Missing

- Glossary

## Flow

- Check if README.md exists for Home page (REQUIRED)
- Check if SUMMARY.MD exists to setup sidebar
  - if exists, loop through this data to create pages
  - otherwise, loop through folders to create it
