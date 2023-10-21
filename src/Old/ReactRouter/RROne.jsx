import React from 'react'
import styled from 'styled-components'
import NewElement from '../../misc/NewElement'

const options = ['select element: ', 'h1', 'p']

export default function RROne() {
  const [elements, setElements] = React.useState([])
  const [elementalState, setElementalState] = React.useState([])

  function updateState(index, value, element) {
    console.log('updating with: ', index, value)
    const newElementalState = [...elementalState]
    const newItem = { section_id: index, element: element, text: value }
    newElementalState[index] = newItem
    setElementalState(newElementalState)
  }

  function createNewElement() {
    const index = elements.length
    setElements([
      ...elements,
      <NewElement
        key={index}
        index={index}
        value={elementalState[index]}
        updateState={updateState}
      />,
    ])
  }

  console.log(elementalState)

  return (
    <Wrapper>
      {elements.map((element, index) => (
        <div key={index}>{element}</div>
      ))}
      <button onClick={createNewElement}>NEW</button>
    </Wrapper>
  )
}

const Wrapper = styled.section``
