import React from 'react'
import styled from 'styled-components'
export default function Test() {
  const [listText, setListText] = React.useState([''])
  const [focusNew, setFocusNew] = React.useState(false)

  const [printList, setPrintList] = React.useState([])

  const test = React.useRef()

  function handleKeyDown(e, index) {
    if (e.key === 'Enter') {
      const newListText = [...listText, '']
      setListText(newListText)
      setFocusNew(true)
      return
    }
    if (e.key === 'Backspace' && !listText[index] && index !== 0) {
      const newListText = [...listText]
      newListText.pop()
      setListText(newListText)
    }
  }

  React.useEffect(() => {
    test.current.focus()
    setFocusNew(false)
  }, [focusNew])

  function handleChange(newText, index) {
    console.log(newText, index)
    const newListText = [...listText]
    newListText[index] = newText
    setListText(newListText)
  }

  function handleClick() {
    if (listText[listText.length - 1] === '') {
      listText.pop()
    }
    const body = JSON.stringify(listText)
    const parsed = JSON.parse(body)
    setPrintList(parsed)
  }

  return (
    <Wrapper>
      {listText.map((item, index) => (
        <input
          key={index}
          value={listText[index]}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          placeholder={index + 1}
          ref={test}
          style={{ padding: '1rem' }}
        />
      ))}
      <button type="button" onClick={handleClick} style={{ border: '2px solid green' }}>
        Submit
      </button>
      <List>
        {printList.map((item, index) => (
          <ListItem key={index}>{item}</ListItem>
        ))}
      </List>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-top: 5rem;
`
const List = styled.ol`
  list-style: revert;
`
const ListItem = styled.li``
