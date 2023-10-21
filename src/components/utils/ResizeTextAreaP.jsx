import React from 'react'
import styled from 'styled-components'

export default function ResizeTextAreaP({ text, setText }) {
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
  border: 2px solid white;

  grid-area: 1 / 1 / 2 / 2;
  padding-block: 0.5rem;

  font-size: 1.25rem;

  padding-left: 4px;
`

const Text = styled.textarea`
  resize: none;
  overflow: hidden;

  border: 2px solid white;

  grid-area: 1 / 1 / 2 / 2;
  padding-block: 0.5rem;

  font-size: 1.25rem;

  padding-left: 4px;

  background: transparent;
  color: hsl(var(--white));
`
