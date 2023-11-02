import React from 'react'
import styled from 'styled-components'

export default function ResizeTextArea({ text, setText, editRef }) {
  return (
    <GrowWrap>
      <VisText>{text}</VisText>
      <Text
        value={text}
        onChange={(e) => setText(e.target.value)}
        ref={editRef}
        placeholder="<p>Enter Code Here</p>"
      />
    </GrowWrap>
  )
}

/*
const Wrapper = styled.pre`
  padding: 16px;
`

const Test = styled.div`
  font-size: 1.25rem;
  line-height: 1.5;
  font-family: 'Sono', monospace;
  font-weight: 500;
`
*/

const GrowWrap = styled.div`
  display: grid;
  padding: 16px;
  background: #2d2b55;
`

const VisText = styled.div`
  white-space: pre-wrap;
  visibility: hidden;

  /* padding: 0.5rem; */
  font: inherit;
  grid-area: 1 / 1 / 2 / 2;

  font-size: 1.25rem;
  line-height: 1.5;
  font-family: 'Sono', monospace;
  font-weight: 500;

  /* padding-left: 4px; */
`

const Text = styled.textarea`
  resize: none;
  overflow: hidden;
  border: none;

  /* padding: 0.5rem; */
  font: inherit;
  grid-area: 1 / 1 / 2 / 2;

  font-size: 1.25rem;
  line-height: 1.5;
  font-family: 'Sono', monospace;
  font-weight: 500;

  /* padding-left: 4px; */

  background: transparent;
  color: hsl(var(--white));

  outline: none;
`
