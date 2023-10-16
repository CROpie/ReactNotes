import React from 'react'
import styled from 'styled-components'
import NewArticle from './NewArticle'
import DelArticle from './DelArticle'

import { Link } from 'react-router-dom'

export default function Article({ categoryId, category_name, articles }) {
  const [isNewArticle, setIsNewArticle] = React.useState(false)

  return (
    <SidebarSubList>
      {articles.map(({ id: articleId, article_name }) => (
        <SidebarSubListItem key={articleId}>
          <SidebarSubListItemHeading>
            <Link to={`${category_name}/${articleId}`}>{article_name}</Link>

            <DelArticle articleId={articleId} />
          </SidebarSubListItemHeading>
        </SidebarSubListItem>
      ))}
      {isNewArticle && <NewArticle categoryId={categoryId} />}
      <button
        onClick={(e) => {
          setIsNewArticle(!isNewArticle)
        }}
      >
        New Article
      </button>
    </SidebarSubList>
  )
}

const SidebarSubList = styled.ul`
  padding-inline: 16px;
  font-size: 1rem;
`

const SidebarSubListItem = styled.li``

const SidebarSubListItemHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

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
