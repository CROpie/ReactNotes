import React from 'react'
import styled from 'styled-components'

import Category from './Category'
import NewCategory from './NewCategory'

import Icon from '../../icons/Icon'

import ContextMenuProvider from '../../utils/ContextMenuProvider'
import { SidebarContext } from '../../../contexts/SidebarCtx'

import { calculateNeighbours } from '../../utils/calculateNeighbours'
import { calculateNewPosition } from '../../utils/calcNewPosition'

export default function Sidebar({ categories, isSidebarOpen, setIsSidebarOpen }) {
  const [isNewCategory, setIsNewCategory] = React.useState(false)
  const { isAllowedDelete, setIsAllowedDelete } = React.useContext(SidebarContext)

  return (
    <Wrapper open={isSidebarOpen} onMouseLeave={() => setIsSidebarOpen(false)}>
      <CategoryList>
        {categories.map((category, index) => {
          return (
            <ContextMenuProvider
              key={category.id}
              container="category"
              data={category}
              neighbours={calculateNeighbours(categories, index)}
            >
              <Category category={category} />
            </ContextMenuProvider>
          )
        })}
        {isNewCategory && (
          <NewCategory
            category_position={calculateNewPosition(categories)}
            setIsNewCategory={setIsNewCategory}
          />
        )}
      </CategoryList>
      <CategoryButton onClick={() => setIsNewCategory(!isNewCategory)}>
        <IconWrapper>
          <Icon id={isNewCategory ? 'MinusPage' : 'PlusPage'} />
        </IconWrapper>
        New Category
      </CategoryButton>
      <AllowDeleteButton
        $is_allowed={isAllowedDelete}
        onClick={() => setIsAllowedDelete(!isAllowedDelete)}
      >
        <IconWrapper>
          <Icon id={isAllowedDelete ? 'Trash' : 'X'} />
        </IconWrapper>
        {isAllowedDelete ? 'Allowing Delete' : 'Hiding Delete'}
      </AllowDeleteButton>
    </Wrapper>
  )
}

const Wrapper = styled.aside`
  position: fixed;
  top: calc(var(--header-height) + 1.25rem);
  z-index: 1;

  left: 0;
  width: var(--sidebar-width);
  height: calc(100% - var(--header-height) - 1.25rem);

  background: hsl(var(--black));
  opacity: 0.9;
  transition: 0.3s ease-in-out all;
  transform: ${(props) => (props.open ? 'translateX(0)' : 'translateX(-100%)')};

  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
    /* background: red;
    width: 4px; */
  }
  &::-webkit-scrollbar-thumb {
    /* background: blue; */
  }
`

const CategoryList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;

  font-size: 1.25rem;
`

const CategoryButton = styled.button`
  /* button as li? */
  cursor: pointer;
  margin-top: 64px;

  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;

  font-size: 1.5rem;
  font-weight: 700;

  padding: 10px 16px;

  border: 2px solid hsl(var(--white));
  color: hsl(var(--white));
  background: hsl(var(--black));

  &:hover {
    border: 2px solid hsl(var(--black));
    color: hsl(var(--black));
    background: hsl(var(--white));
  }
`

const IconWrapper = styled.div`
  height: 1.5rem;
`

const AllowDeleteButton = styled(CategoryButton)`
  &:hover {
    border: 2px solid hsl(var(--red));
    color: hsl(var(--white));
    background: hsl(var(--red));
  }

  color: ${(props) => (props.$is_allowed ? 'hsl(var(--red))' : 'hsl(var(--white))')};

  border: ${(props) =>
    props.$is_allowed ? '2px solid hsl(var(--red))' : '2px solid hsl(var(--white))'};
`

/*
  // const queriesCache = queryClient.getQueryData({ queryKey: ['categories'] })
  // console.log('queriesCache: ', queriesCache)
  // const queriesFetch = await queryClient.fetchQuery({
  //   queryKey: ['categories'],
  //   queryFn: getCategories,
  // })
  // console.log('queriesFetch: ', queriesFetch)
*/
