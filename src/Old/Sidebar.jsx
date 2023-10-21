import styled from 'styled-components'
import { Link } from 'react-router-dom'
import React from 'react'

import { SidebarContext } from '../../contexts/SidebarCtx'

const URL = 'http://127.0.0.1:8000'

export default function Sidebar() {
  const { openCategory, setOpenCategory } = React.useContext(SidebarContext)

  const [categories, setCategories] = React.useState([])

  const [isNewCategory, setIsNewCategory] = React.useState(false)
  const [categoryName, setCategoryName] = React.useState('')
  const [delConfirmCategory, setDelConfirmCategory] = React.useState()

  const [isNewArticle, setIsNewArticle] = React.useState(false)
  const [articleName, setArticleName] = React.useState('')
  const [delConfirmArticle, setDelConfirmArticle] = React.useState()

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

  function handleOpenCategory(id) {
    if (openCategory === id) {
      setOpenCategory(0)
    } else {
      setOpenCategory(id)
    }
  }

  async function handleSubmitNewCategory(e) {
    e.preventDefault()
    const response = await fetch(`${URL}/category`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category_name: categoryName }),
    })
    if (!response.ok) {
      console.log('something went wrong..')
      return
    }
    const json = await response.json()
    console.log(json)
  }

  async function handleDeleteCategory(categoryId) {
    const response = await fetch(`${URL}/category/?category_id=${categoryId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) {
      console.log('something went wrong..')
      return
    }
    const json = await response.json()
    console.log(json)
  }

  async function handleSubmitNewArticle(e, categoryId) {
    e.preventDefault()
    const response = await fetch(`${URL}/article`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ article_name: articleName, category_id: categoryId }),
    })
    if (!response.ok) {
      console.log('something went wrong..')
      return
    }
    const json = await response.json()
    console.log(json)
  }

  async function handleDeleteArticle(articleId) {
    const response = await fetch(`${URL}/article/?article_id=${articleId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) {
      console.log('something went wrong..')
      return
    }
    const json = await response.json()
    console.log(json)
  }

  if (categories.length < 1) {
    return <p>Loading...</p>
  }

  return (
    <Wrapper>
      <SidebarList>
        {categories.map(({ id: categoryId, category_name, articles }) => (
          <SidebarListItem key={categoryId}>
            <SidebarListItemHeading>
              <button onClick={() => handleOpenCategory(categoryId)}>{category_name}</button>
              {delConfirmCategory === categoryId && (
                <CategoryDelButton onClick={() => handleDeleteCategory(categoryId)}>
                  DEL
                </CategoryDelButton>
              )}

              {delConfirmCategory !== categoryId && (
                <CategoryDelButton onClick={() => setDelConfirmCategory(categoryId)}>
                  X
                </CategoryDelButton>
              )}
            </SidebarListItemHeading>
            {openCategory === categoryId && (
              <SidebarSubList>
                {articles.map(({ id: articleId, article_name }) => (
                  <SidebarSubListItem key={articleId}>
                    <SidebarSubListItemHeading>
                      <Link to={`${category_name}/${articleId}`}>{article_name}</Link>

                      {delConfirmArticle === articleId && (
                        <button onClick={() => handleDeleteArticle(articleId)}>DEL</button>
                      )}

                      {delConfirmArticle !== articleId && (
                        <button onClick={() => setDelConfirmArticle(articleId)}>X</button>
                      )}
                    </SidebarSubListItemHeading>
                  </SidebarSubListItem>
                ))}
                {isNewArticle && (
                  <NewArticleForm onSubmit={(e) => handleSubmitNewArticle(e, categoryId)}>
                    <NewArticleInput
                      type="text"
                      placeholder="Basics"
                      value={articleName}
                      onChange={(e) => setArticleName(e.target.value)}
                    />
                    <button type="submit">*</button>
                  </NewArticleForm>
                )}
                <button
                  onClick={(e) => {
                    setIsNewArticle(!isNewArticle)
                  }}
                >
                  New Article
                </button>
              </SidebarSubList>
            )}
          </SidebarListItem>
        ))}
        {isNewCategory && (
          <NewCategoryForm onSubmit={handleSubmitNewCategory}>
            <NewCategoryInput
              type="text"
              placeholder="Library"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <button type="submit">*</button>
          </NewCategoryForm>
        )}
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

const SidebarListItem = styled.li`
  text-transform: capitalize;
  width: 100%;
`

const SidebarListItemHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid black;

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

const CategoryDelButton = styled.button`
  color: red;
`

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

const NewArticleForm = styled.form`
  display: flex;
`

const NewArticleInput = styled.input`
  border: none;
`

const NewCategoryForm = styled.form`
  display: flex;
`

const NewCategoryInput = styled.input`
  border: none;
  font-size: 1.25rem;
`
