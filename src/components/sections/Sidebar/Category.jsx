import React from 'react'
import styled from 'styled-components'

import Articles from './Articles'
import Icon from '../../icons/Icon'

import { SidebarContext } from '../../../contexts/SidebarCtx'
import { EditContext } from '../../../contexts/EditCtx'
import EditCategory from './EditCategory'

export default function Category({ category }) {
  const { id: categoryId, category_name, articles } = category

  const { openCategory, setOpenCategory } = React.useContext(SidebarContext)
  const { isEdit } = React.useContext(EditContext)

  function handleOpenCategory(id) {
    if (openCategory === id) {
      setOpenCategory(0)
    } else {
      setOpenCategory(id)
    }
  }

  return (
    // <CategoryListItem onMouseEnter={() => setOpenCategory(categoryId)}>
    <CategoryListItem>
      {isEdit === `category-${categoryId}` ? (
        <EditCategory category_id={categoryId} category_name={category_name} />
      ) : (
        <CategoryButton onClick={() => handleOpenCategory(categoryId)}>
          {category_name}
        </CategoryButton>
      )}

      {openCategory === categoryId && (
        <Articles articles={articles} categoryId={categoryId} category_name={category_name} />
      )}
    </CategoryListItem>
  )
}

const CategoryListItem = styled.li`
  text-transform: capitalize;
  width: 100%;
`

const CategoryButton = styled.button`
  width: 100%;
  text-align: start;

  font-size: 1.5rem;
  font-weight: 700;

  padding: 10px 16px;

  border: 2px solid var(--primary);
  color: hsl(var(--black));
  background: var(--primary);

  & > div {
    transition: opacity 1s;
    opacity: 0;
    pointer-events: none;
  }

  &:hover > div {
    opacity: 1;
    pointer-events: auto;
  }

  &:hover {
    border: 2px solid var(--primary);
    color: var(--primary);
    background: hsl(var(--black));
  }
`

/*
const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  color: inherit;

  font-size: 1.5rem;
  font-weight: 700;

  padding-inline: 1rem;
  padding-block: 10px;

  border: 2px solid hsl(var(--white));
  color: hsl(var(--white));
  background: black;

  &:hover {
    background: hsl(var(--white));
    border: 2px solid black;
    color: black;
  }
`
*/

/*
  return (
    <SidebarListItem>
      <SidebarListItemBlock>
        <CategoryButton onClick={() => handleOpenCategory(categoryId)}>
          {category_name}
        </CategoryButton>

        <DelCategory categoryId={categoryId} />
      </SidebarListItemBlock>
      {openCategory === categoryId && (
        <Articles articles={articles} categoryId={categoryId} category_name={category_name} />
      )}
    </SidebarListItem>
  )
  */

/*


const CategoryButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-inline: 1rem;

  border: 2px solid hsl(var(--black));
  color: hsl(var(--black));
  background: var(--primary);

  font-size: 1.5rem;
  font-weight: 700;

  & > button:last-of-type {
    transition: opacity 1s;
    opacity: 0;
    pointer-events: none;
  }

  &:hover > button:last-of-type {
    opacity: 1;
    pointer-events: auto;
  }

  &:hover {
    background: hsl(var(--black));
    border: 2px solid var(--primary);
    color: var(--primary);
  }
`

*/
