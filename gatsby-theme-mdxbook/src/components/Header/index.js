import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

function Header(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <div className="header">{data.site.siteMetadata.title} test</div>
      )}
    />
  );
}

export default Header;
