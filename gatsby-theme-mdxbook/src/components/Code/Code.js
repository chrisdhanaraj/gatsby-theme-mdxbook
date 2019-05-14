import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/duotoneLight'
import css from './code.module.css';

const Code = ({ children} ) => {
  return (
    <Highlight {...defaultProps} theme={theme} code={children} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={css.pre} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              <span className={css.line}>{i + 1}</span>
              {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

export default Code;
