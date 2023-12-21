import React from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { H1_style } from '../styles/mixins'

import Logo from '../../assets/BearbeerCrop.png'
import Icon from '../icons/Icon'

export default function Header({ setIsSidebarOpen, setShowModal }) {
  let { category_name, article_name } = useParams()

  let navigate = useNavigate()

  if (!category_name) {
    category_name = 'Welcome'
  }
  return (
    <Wrapper>
      <LHS
        onMouseEnter={() => {
          setIsSidebarOpen(true)
        }}
      >
        {/* <Link to="/">LOGO</Link> */}
        <ImageContainer onClick={() => navigate('/')}>
          <img src={Logo} alt="beerbear" />
        </ImageContainer>
      </LHS>
      {/* <Link to="/test">Test Page</Link> */}
      {/* <Heading>{article_name ? `${category_name}-${article_name}` : category_name}</Heading> */}
      {article_name ? (
        <Heading>
          {category_name}-<ArticleSpan>{article_name}</ArticleSpan>
        </Heading>
      ) : (
        <Heading>{category_name}</Heading>
      )}
      <Side>
        <StyledIcon id="Help" onClick={() => setShowModal(true)} />
      </Side>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  z-index: 2;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: hsl(var(--black));
  border-bottom: 4px solid hsl(var(--white));
  /* display: grid;
  grid-template-columns: var(--sidebar-width) 1fr; */
`

const LHS = styled.button`
  padding-block: 8px;
  /* width: var(--sidebar-width); */
  /* border-top: 2px solid hsl(var(--white));
  border-bottom: 2px solid hsl(var(--white)); */
`

const ImageContainer = styled.div`
  height: 3rem;
  padding-left: 2rem;
`

const Heading = styled.h1`
  flex: 1;
  ${H1_style}
  padding-block: 8px;
  border: none;
  white-space: nowrap;
`

const ArticleSpan = styled.span`
  color: orange;
`
const Side = styled.div`
  width: 5rem;
  padding-right: 2rem;
`

const StyledIcon = styled(Icon)`
  height: 3rem;
  width: 3rem;
  color: white;

  transition: color 0.2s ease-in;
  cursor: pointer;

  &:hover {
    color: lime;
  }
`
