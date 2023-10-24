import React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'
import { SidebarContext } from '../../../contexts/SidebarCtx'
import { EditContext } from '../../../contexts/EditCtx'

import EditArticle from './EditArticle'

export default function Article({ article, category_name }) {
  const { id: articleId, article_name } = article

  const { setSelectedArticle } = React.useContext(SidebarContext)
  const { isEdit } = React.useContext(EditContext)

  return (
    <SidebarSubListItem>
      {isEdit === `article-${articleId}` ? (
        <EditArticle article_id={articleId} article_name={article_name} />
      ) : (
        <ArticleButton
          to={`${category_name}/${articleId}/${article_name}`}
          onClick={() => {
            setSelectedArticle(article_name)
          }}
        >
          <LinkText>{article_name}</LinkText>
        </ArticleButton>
      )}
    </SidebarSubListItem>
  )
}

const SidebarSubListItem = styled.li``

const ArticleButton = styled(Link)`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 2px solid hsl(var(--primary-hover));
  color: hsl(var(--black));
  background: var(--primary-hover);

  font-size: 1.125rem;
  font-weight: 500;

  padding: 4px 16px;

  &:hover {
    background: hsl(var(--black));
    border: 2px solid hsl(var(--primary-hover));
    color: var(--primary-hover);
  }

  & > button:last-of-type {
    transition: opacity 1s;
    opacity: 0;
    pointer-events: none;
  }

  &:hover > button:last-of-type {
    opacity: 1;
    pointer-events: auto;
  }
`

const LinkText = styled.p`
  color: inherit;
`

/*

  return (
    <SidebarSubListItem>
      <ArticleButton>
        <ArticleLink to={`${category_name}/${articleId}`}>{article_name}</ArticleLink>

        <DelArticle articleId={articleId} />
      </ArticleButton>
    </SidebarSubListItem>
  )

  */
