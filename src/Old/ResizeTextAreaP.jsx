import React from 'react'
import styled from 'styled-components'

export default function ResizeTextAreaP({ text, setText, editRef }) {
  console.log('text: ', text)
  return (
    <GrowWrap>
      <VisText>{text}</VisText>
      <Text
        value={text}
        onChange={(e) => setText(e.target.value)}
        ref={editRef}
        placeholder="paragraph tag"
      />
    </GrowWrap>
  )
}

const GrowWrap = styled.div`
  display: grid;
`

const VisText = styled.div`
  white-space: pre-wrap;
  visibility: hidden;
  /* border: 2px solid white; */

  grid-area: 1 / 1 / 2 / 2;
  /* padding-top: 0.5rem; */

  font-size: 1.25rem;

  /* padding-left: 8px; */
`

const Text = styled.textarea`
  resize: none;
  overflow: hidden;
  border: none;

  grid-area: 1 / 1 / 2 / 2;
  /* padding-top: 0.5rem; */

  font-size: 1.25rem;

  /* padding-left: 8px; */

  background: transparent;
  color: hsl(var(--white));

  outline: none;
`
