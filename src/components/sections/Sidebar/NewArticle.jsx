import React from 'react'
import styled from 'styled-components'

import { URL } from '../../../constants'

export default function NewArticle({ categoryId }) {
  const [articleName, setArticleName] = React.useState('')

  async function handleSubmitNewArticle(categoryId) {
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

  return (
    <NewArticleForm
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmitNewArticle(categoryId)
      }}
    >
      <NewArticleInput
        type="text"
        placeholder="Basics"
        value={articleName}
        onChange={(e) => setArticleName(e.target.value)}
      />
      <button type="submit">*</button>
    </NewArticleForm>
  )
}

const NewArticleForm = styled.form`
  display: flex;
`

const NewArticleInput = styled.input`
  border: none;
`
