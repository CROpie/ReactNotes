import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { Header } from '../components/sections'

import Sidebar from '../components/sections/Sidebar/Sidebar'

export default function Root({ queryClient }) {
  return (
    <Wrapper>
      <Header />
      <ContentWrapper>
        <SidebarWrapper>
          <Sidebar queryClient={queryClient} />
        </SidebarWrapper>

        <OutletWrapper>
          <Outlet />
        </OutletWrapper>
      </ContentWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.main``

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: var(--sidebar-width) 1fr;
`

const SidebarWrapper = styled.div`
  border: 2px solid blue;
`

const OutletWrapper = styled.div`
  border: 2px solid blue;
`
