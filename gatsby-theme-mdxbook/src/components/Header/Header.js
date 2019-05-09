import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import './header.css';

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
        <header className="header">
          <h1 className="header__title">{data.site.siteMetadata.title}</h1>
        </header>
      )}
    />
  );
}

export default Header;
