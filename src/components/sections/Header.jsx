import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { H1_style } from '../styles/mixins'

import { SidebarContext } from '../../contexts/SidebarCtx'

import Logo from '../../assets/BearbeerCrop.png'

export default function Header({ setIsSidebarOpen }) {
  let { category_name, article_name } = useParams()

  if (!category_name) {
    category_name = 'Welcome'
  }
  return (
    <Wrapper>
      <LHS>
        {/* <Link to="/">LOGO</Link> */}
        <ImageContainer
          onMouseEnter={() => {
            setIsSidebarOpen(true)
          }}
        >
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
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: hsl(var(--black));
  /* display: grid;
  grid-template-columns: var(--sidebar-width) 1fr; */
`

const LHS = styled.div`
  padding-block: 8px;
  border-top: 2px solid hsl(var(--white));
  border-bottom: 2px solid hsl(var(--white));
`

const ImageContainer = styled.div`
  height: 3rem;
`

const Heading = styled.h1`
  flex: 1;
  ${H1_style}
  padding-block: 8px;
  border-left: none;
  white-space: nowrap;
`

const ArticleSpan = styled.span`
  color: orange;
`
