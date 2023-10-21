import React from 'react'

import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { Header } from '../components/sections'

import Sidebar from '../components/sections/Sidebar/Sidebar'

import { BaseURL } from '../constants'
import { useQuery } from '@tanstack/react-query'

function categoryQuery() {
  return { queryKey: ['categories'], queryFn: getCategories, staleTime: 1000 * 60 * 5 }
}

async function getCategories() {
  const response = await fetch(`${BaseURL}/category`)
  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }
  return response.json()
}

export const sidebarLoader = (queryClient) => async () => {
  console.log('inside loader')
  const query = categoryQuery()

  const data = queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))

  return data
}

export default function Root() {
  const query = categoryQuery()
  const { data: categories, status } = useQuery(query)

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

  return (
    <Wrapper>
      <Header setIsSidebarOpen={setIsSidebarOpen} />
      <MainWrapper>
        <SidebarWrapper>
          {status === 'idle' && <p>...</p>}
          {status === 'error' && <p>Error...</p>}
          {status === 'loading' && <p>Loading...</p>}
          {status === 'success' && (
            <Sidebar
              categories={categories}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          )}
        </SidebarWrapper>

        <OutletWrapper>
          <Outlet />
        </OutletWrapper>
      </MainWrapper>
    </Wrapper>
  )
}

/* margin-top on MainWrapper causes vertical scrollbar. 
mb on Wrapper is fine, but also need padding (not margin) on OutletWrapper */

const Wrapper = styled.main`
  margin-bottom: calc(var(--header-height) + 4rem);
`

const MainWrapper = styled.div``

const SidebarWrapper = styled.div``

const OutletWrapper = styled.div`
  padding-top: 4rem;
`
