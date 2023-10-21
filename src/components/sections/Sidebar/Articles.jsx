import React from 'react'
import styled from 'styled-components'
import NewArticle from './NewArticle'

import Article from './Article'
import Icon from '../../icons/Icon'
export default function Articles({ categoryId, category_name, articles }) {
  const [isNewArticle, setIsNewArticle] = React.useState(false)

  return (
    <SidebarSubList>
      {articles.map((article) => (
        <Article key={article.id} article={article} category_name={category_name} />
      ))}
      {isNewArticle && <NewArticle categoryId={categoryId} setIsNewArticle={setIsNewArticle} />}

      <ArticleButton
        onClick={() => {
          setIsNewArticle(!isNewArticle)
        }}
      >
        <IconWrapper>
          <Icon id={isNewArticle ? 'MinusPage' : 'PlusPage'} />
        </IconWrapper>
        <p>New Article</p>
      </ArticleButton>
    </SidebarSubList>
  )
}

const SidebarSubList = styled.ul`
  padding-left: 16px;
`

const ArticleButton = styled.button`
  margin-bottom: 32px;
  width: 100%;

  display: flex;
  align-items: center;
  gap: 4px;

  border: 2px solid hsl(var(--white));
  color: hsl(var(--white));
  background: hsl(var(--black));

  font-size: 1.125rem;
  font-weight: 500;

  padding: 4px 16px;

  &:hover {
    border: 2px solid hsl(var(--black));
    color: hsl(var(--black));
    background: hsl(var(--white));
  }
`

const IconWrapper = styled.div`
  height: 1.125rem;
`
