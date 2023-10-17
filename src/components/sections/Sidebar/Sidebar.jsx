import React from 'react'
import styled from 'styled-components'

import Category from './Category'
import NewCategory from './NewCategory'

import { URL } from '../../../constants'
import { useQuery } from '@tanstack/react-query'

function categoryQuery() {
  return { queryKey: ['categories'], queryFn: getCategories, staleTime: 1000 * 60 * 5 }
}

async function getCategories() {
  const response = await fetch(`${URL}/category`)
  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }
  return response.json()
}

export const sidebarLoader = (queryClient) => async () => {
  console.log('inside loader')
  const query = categoryQuery()

  const data = queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
  console.log(data)

  // const queriesCache = queryClient.getQueryData({ queryKey: ['categories'] })
  // console.log('queriesCache: ', queriesCache)
  // const queriesFetch = await queryClient.fetchQuery({
  //   queryKey: ['categories'],
  //   queryFn: getCategories,
  // })
  // console.log('queriesFetch: ', queriesFetch)
  return data
}

export default function Sidebar() {
  const [isNewCategory, setIsNewCategory] = React.useState(false)

  const query = categoryQuery()
  const { data: categories, status } = useQuery(query)
  console.log(categories)
  // const { data: categories, status } = useQuery({
  //   queryKey: ['categories'],
  //   queryFn: getCategories,
  //   staleTime: 1000 * 60 * 5,
  // })

  return (
    <Wrapper>
      {status === 'idle' && <p>...</p>}
      {status === 'error' && <p>Error...</p>}
      {status === 'loading' && <p>Loading...</p>}
      {status === 'success' && (
        <SidebarList>
          {categories.map((category) => (
            <Category category={category} key={category.id} />
          ))}
          {isNewCategory && <NewCategory setIsNewCategory={setIsNewCategory} />}
          <button onClick={() => setIsNewCategory(!isNewCategory)}>New Category</button>
        </SidebarList>
      )}
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
