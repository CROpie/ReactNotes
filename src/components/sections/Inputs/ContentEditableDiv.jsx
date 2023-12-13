import React from 'react'
import styled from 'styled-components'

export default function ContentEditableDiv({ text, setText, editRef }) {
  const [another, setAnother] = React.useState(text)
  return (
    // <Wrapper>
    //   <Text
    //     contentEditable={true}
    //     // dangerouslySetInnerHTML={{ __html: text }}
    //     onChange={(e) => {
    //       setText(e.target.innerHTML)
    //     }}
    //   >
    //     {text}
    //   </Text>

    //   <input value={another} onChange={(e) => setText(e.target.value)} hidden />
    // </Wrapper>

    <Wrapper>
      <TextArea value={text} onChange={(e) => setText(e.target.value)} ref={editRef} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  padding: 16px;
  background: #2d2b55;
`

const TextArea = styled.textarea`
  /* resize: none;
  overflow: hidden;
  border: none; */

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
