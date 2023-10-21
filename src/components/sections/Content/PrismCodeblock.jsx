import { Highlight, themes, Prism } from 'prism-react-renderer'
import styled from 'styled-components'
;(typeof global !== 'undefined' ? global : window).Prism = Prism
await import('prismjs/components/prism-python')

{
  /* <Highlight theme={themes.shadesOfPurple} code={codeBlock} language="jsx"> */
}

/*
    theme$h as dracula,
    theme$g as duotoneDark,
    theme$f as duotoneLight,
    theme$e as github,
    theme$3 as jettwaveDark,
    theme$2 as jettwaveLight,
    theme$d as nightOwl,
    theme$c as nightOwlLight,
    theme$b as oceanicNext,
    theme$a as okaidia,
    theme$1 as oneDark,
    theme as oneLight,
    theme$9 as palenight,
    theme$8 as shadesOfPurple,
    theme$7 as synthwave84,
    theme$6 as ultramin,
    theme$5 as vsDark,
    theme$4 as vsLight,
*/

export default function PrismCodeblock({ codeBlock }) {
  return (
    <Highlight theme={themes.shadesOfPurple} code={codeBlock} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Wrapper style={style}>
          {tokens.map((line, i) => (
            <Test key={i} {...getLineProps({ line })}>
              {/* <Index>{i + 1}</Index> */}
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </Test>
          ))}
        </Wrapper>
      )}
    </Highlight>
  )
}

const Wrapper = styled.pre`
  padding: 16px;
`

const Test = styled.div`
  font-size: 1.25rem;
  line-height: 1.5;
  font-family: 'Sono', monospace;
  font-weight: 500;
`

const Index = styled.span`
  opacity: 0.6;
  color: grey;
  padding-right: 16px;
  user-select: none;
`
