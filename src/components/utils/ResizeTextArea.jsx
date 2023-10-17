import React from 'react'
import styled from 'styled-components'

export default function ResizeTextArea({ text, setText }) {
  return (
    <GrowWrap>
      <VisText>{text}</VisText>
      <Text value={text} onChange={(e) => setText(e.target.value)} />
    </GrowWrap>
  )
}

const GrowWrap = styled.div`
  display: grid;
  padding: 16px;
`

const VisText = styled.div`
  white-space: pre-wrap;
  visibility: hidden;
  border: 2px solid black;
  /* padding: 0.5rem; */
  font: inherit;
  grid-area: 1 / 1 / 2 / 2;

  font-size: 1.25rem;
  line-height: 1.5;
  font-family: 'Sono', monospace;
  font-weight: 500;
`

const Text = styled.textarea`
  resize: none;
  overflow: hidden;

  border: 2px solid black;
  /* padding: 0.5rem; */
  font: inherit;
  grid-area: 1 / 1 / 2 / 2;

  font-size: 1.25rem;
  line-height: 1.5;
  font-family: 'Sono', monospace;
  font-weight: 500;
`
