import React from 'react'
import styled from 'styled-components'

import Article from './Article'
import DelCategory from './DelCategory'

import { SidebarContext } from '../../../contexts/SidebarCtx'

export default function Category({ category }) {
  const { id: categoryId, category_name, articles } = category

  const { openCategory, setOpenCategory } = React.useContext(SidebarContext)

  function handleOpenCategory(id) {
    if (openCategory === id) {
      setOpenCategory(0)
    } else {
      setOpenCategory(id)
    }
  }

  return (
    <SidebarListItem>
      <SidebarListItemHeading>
        <button onClick={() => handleOpenCategory(categoryId)}>{category_name}</button>

        <DelCategory categoryId={categoryId} />
      </SidebarListItemHeading>
      {openCategory === categoryId && (
        <Article articles={articles} categoryId={categoryId} category_name={category_name} />
      )}
    </SidebarListItem>
  )
}

const SidebarListItem = styled.li`
  text-transform: capitalize;
  width: 100%;
`

const SidebarListItemHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid black;

  & > button:last-of-type {
    transition: opacity 1s;
    opacity: 0;
    pointer-events: none;
  }

  &:hover > button:last-of-type {
    opacity: 1;
    pointer-events: auto;
  }
`
