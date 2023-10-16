import React from 'react'
import styled from 'styled-components'

import Category from './Category'
import NewCategory from './NewCategory'

import { URL } from '../../../constants'

export default function Sidebar() {
  const [categories, setCategories] = React.useState([])

  const [isNewCategory, setIsNewCategory] = React.useState(false)

  React.useEffect(() => {
    async function getCategories() {
      const response = await fetch(`${URL}/category`)
      if (!response.ok) {
        console.log('something went wrong...')
        return
      }
      const json = await response.json()
      setCategories(json)
    }

    getCategories()
  }, [])

  // console.log(categories)

  return (
    <Wrapper>
      <SidebarList>
        {categories.map((category) => (
          <Category category={category} key={category.id} />
        ))}
        {isNewCategory && <NewCategory />}
        <button onClick={() => setIsNewCategory(!isNewCategory)}>New Category</button>
      </SidebarList>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 8px;
`

const SidebarList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid lime;
  align-items: flex-start;
  font-size: 1.25rem;
`
