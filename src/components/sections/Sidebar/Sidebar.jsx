import React from 'react'
import styled from 'styled-components'

import Category from './Category'
import NewCategory from './NewCategory'

import Icon from '../../icons/Icon'

export default function Sidebar({ categories, isSidebarOpen, setIsSidebarOpen }) {
  console.log(categories)
  const [isNewCategory, setIsNewCategory] = React.useState(false)

  return (
    <Wrapper open={isSidebarOpen} onMouseLeave={() => setIsSidebarOpen(false)}>
      <CategoryList>
        {categories.map((category) => (
          <Category category={category} key={category.id} />
        ))}
        {isNewCategory && <NewCategory setIsNewCategory={setIsNewCategory} />}
      </CategoryList>
      <CategoryButton onClick={() => setIsNewCategory(!isNewCategory)}>
        <IconWrapper>
          <Icon id={isNewCategory ? 'MinusPage' : 'PlusPage'} />
        </IconWrapper>
        <p>New Category</p>
      </CategoryButton>
    </Wrapper>
  )
}

const Wrapper = styled.aside`
  position: fixed;
  top: calc(var(--header-height) + 1.25rem);
  bottom: 10%;

  left: 0;
  width: 20rem;
  height: 100%;

  background: hsl(var(--black));
  opacity: 0.9;
  transition: 0.3s ease-in-out all;
  transform: ${(props) => (props.open ? 'translateX(0)' : 'translateX(-100%)')};
`

const CategoryList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;

  align-items: flex-start;
  font-size: 1.25rem;

  position: relative;
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

/*
  // const queriesCache = queryClient.getQueryData({ queryKey: ['categories'] })
  // console.log('queriesCache: ', queriesCache)
  // const queriesFetch = await queryClient.fetchQuery({
  //   queryKey: ['categories'],
  //   queryFn: getCategories,
  // })
  // console.log('queriesFetch: ', queriesFetch)
*/
