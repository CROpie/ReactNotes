import React from 'react'
import styled from 'styled-components'

import { BaseURL } from '../../../constants'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import Icon from '../../icons/Icon'

export default function NewArticle({ categoryId, setIsNewArticle }) {
  const [articleName, setArticleName] = React.useState('')

  const queryClient = useQueryClient()

  async function postArticle(categoryId) {
    const response = await fetch(`${BaseURL}/article`, {
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
    mutationFn: async (categoryId) => postArticle(categoryId),
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
      <IconWrapper type="submit">
        <Icon id="Save" />
      </IconWrapper>
    </NewArticleForm>
  )
}

const NewArticleForm = styled.form`
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
`

const NewArticleInput = styled.input`
  font: inherit;
  border: none;
  background: transparent;
  outline: none;
`

const IconWrapper = styled.button`
  height: 1.125rem;

  &:hover {
    color: var(--highlight);
  }
`
