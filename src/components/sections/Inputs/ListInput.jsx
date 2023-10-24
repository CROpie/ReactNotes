import React from 'react'
import styled from 'styled-components'
import { P_style } from '../../styles/mixins'

export default function ListInput({ tag, text, setText, editRef, edit }) {
  //   const [listText, setListText] = React.useState([''])
  const [listText, setListText] = React.useState(edit ? JSON.parse(text) : [''])

  console.log('editRef: ', editRef)

  /*
    This was working to focus new input fields when they were created, but
    caused errors at random times */

  //   const [focusNew, setFocusNew] = React.useState(false)

  //   const test = React.useRef()

  //   React.useEffect(() => {
  //     test.current.focus()
  //     setFocusNew(false)
  //   }, [focusNew])

  function handleKeyDown(e, index) {
    if (e.key === 'Enter') {
      const newListText = [...listText, '']
      setListText(newListText)
      setText(JSON.stringify(newListText))
      //   setFocusNew(true)
      return
    }
    if (e.key === 'Backspace' && !listText[index] && index !== 0) {
      const newListText = [...listText]
      newListText.pop()
      setListText(newListText)
      setText(JSON.stringify(newListText))
    }
  }

  function handleChange(newText, index) {
    const newListText = [...listText]
    newListText[index] = newText
    setListText(newListText)
    setText(JSON.stringify(newListText))
  }

  //   if (!text) {
  //     setText('[""]')
  //   }

  /* 
    Needed to include a separate non-mapped version for the first run.
    The above function ( setText('[""]') ) worked, but not when add item was toggled on and off ??
  */
  return (
    <Wrapper>
      {!text ? (
        <InputWrapper>
          <Marker>{tag === 'ol' ? 0 + 1 : '•'}</Marker>
          <ListInputStyle
            value={listText[0]}
            onChange={(e) => handleChange(e.target.value, 0)}
            onKeyDown={(e) => handleKeyDown(e, 0)}
            ref={editRef}
            // placeholder={index + 1}
            // ref={test}
          />
        </InputWrapper>
      ) : (
        JSON.parse(text).map((_, index) => (
          <InputWrapper>
            <Marker>{tag === 'ol' ? index + 1 : '•'}</Marker>
            <ListInputStyle
              key={index}
              value={listText[index]}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={editRef}
              // placeholder={index + 1}
              // ref={test}
            />
          </InputWrapper>
        ))
      )}
    </Wrapper>
  )
}

const Wrapper = styled.ul``

const InputWrapper = styled.li`
  position: relative;
`

const Marker = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
`

const ListInputStyle = styled.input`
  ${P_style}
  background: transparent;
  outline: none;
  border: 2px solid hsl(var(--white));
  color: hsl(var(--white));
  padding-left: 42px;
`
