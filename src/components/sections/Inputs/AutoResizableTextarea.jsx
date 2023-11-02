import React from 'react'
import styled from 'styled-components'
import { P_style } from '../../styles/mixins'

function AutoResizableTextarea({ text, setText, placeholder = 'Text...' }) {
  const textAreaRef = React.useRef()

  React.useEffect(() => {
    const textarea = textAreaRef.current

    const adjustHeight = () => {
      textarea.style.height = `auto`
      textarea.style.height = `${textarea.scrollHeight}px`
    }
    textarea.addEventListener('input', adjustHeight)

    adjustHeight()

    return () => {
      textarea.removeEventListener('input', adjustHeight)
    }
  }, [textAreaRef])

  return (
    <Wrapper>
      <TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        ref={textAreaRef}
        placeholder={placeholder}
        rows="1"
      />
    </Wrapper>
  )
}

export default AutoResizableTextarea

const Wrapper = styled.div`
  width: 100%;
  background: #2d2b55;
`

const TextArea = styled.textarea`
  resize: none;
  border: none;
  overflow: hidden;

  width: 100%;
  font-family: JetBrains;
  font-weight: 600;
  ${P_style}
  line-height: 1.5;

  background: transparent;
  color: hsl(var(--white));

  outline: none;
`
