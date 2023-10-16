import React from 'react'
import styled from 'styled-components'

import { URL } from '../../../constants'

import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function NewArticle({ categoryId, setIsNewArticle }) {
  const [articleName, setArticleName] = React.useState('')

  const queryClient = useQueryClient()

  async function handleSubmitNewArticle(categoryId) {
    const response = await fetch(`${URL}/article`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ article_name: articleName, category_id: categoryId }),
    })
    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }
    return response.json()
  }

  const mutation = useMutation({
    mutationFn: async (categoryId) => handleSubmitNewArticle(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      setIsNewArticle(false)
    },
    onError: (error) => {
      console.error('onError something went wrong...', error)
    },
  })

  return (
    <NewArticleForm
      onSubmit={(e) => {
        e.preventDefault()
        mutation.mutate(categoryId)
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
