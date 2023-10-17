import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <Wrapper>
      <LHS>
        <Link to="/">LOGO</Link>
      </LHS>
      <Link to="/test">Test Page</Link>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: var(--sidebar-width) 1fr;
`

const LHS = styled.div`
  border: 2px solid red;
`
