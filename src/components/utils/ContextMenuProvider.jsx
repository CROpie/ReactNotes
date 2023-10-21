import React from 'react'
import styled, { css } from 'styled-components'
import { ContextMenuContext } from '../../contexts/ContextMenuCtx'

export default function ContextMenuProvider({ menu, children }) {
  //   const [clicked, setClicked] = React.useState(false)
  //   const [points, setPoints] = React.useState({ x: 0, y: 0 })
  const { clicked, setClicked, points, setPoints } = React.useContext(ContextMenuContext)
  const id = React.useId()

  React.useEffect(() => {
    console.log('using effect @: ', id)
    const handleClick = () => setClicked(false)
    window.addEventListener('click', handleClick)
    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <Wrapper
      onContextMenu={(e) => {
        e.preventDefault()
        setClicked(true)
        setPoints({ x: e.pageX, y: e.pageY })
        console.log('Right Click', e.pageX, e.pageY)
      }}
    >
      {children}
      {clicked && (
        <ContextMenu top={points.y} left={points.x}>
          <ul>
            {menu.map((items) => (
              <li key={items.id}>
                <button onClick={items.fn}>{items.text}</button>
              </li>
            ))}
          </ul>
        </ContextMenu>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border: 2px solid purple;
  color: white;
`

const ContextMenu = styled.div`
  position: absolute;
  width: 200px;
  background-color: #383838;
  border-radius: 5px;
  box-sizing: border-box;
  ${({ top, left }) => css`
    top: ${top}px;
    left: ${left}px;
  `}
  ul {
    box-sizing: border-box;
    padding: 10px;
    margin: 0;
    list-style: none;
  }
  ul li {
    padding: 18px 12px;
  }
  /* hover */
  ul li:hover {
    cursor: pointer;
    background-color: #000000;
  }
`
