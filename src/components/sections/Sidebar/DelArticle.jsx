import React from 'react'
import styled from 'styled-components'

import { BaseURL } from '../../../constants'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import Icon from '../../icons/Icon'

export default function DelArticle({ articleId }) {
  const [delConfirmArticle, setDelConfirmArticle] = React.useState()

  const queryClient = useQueryClient()

  async function deleteArticle(articleId) {
    const response = await fetch(`${BaseURL}/article/?article_id=${articleId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }
    return response.json()
  }

  const mutation = useMutation({
    mutationFn: async (articleId) => deleteArticle(articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (error) => {
      console.error('onError something went wrong...', error)
    },
  })

  return (
    <>
      {delConfirmArticle === articleId && (
        <ArticleDelButton
          onClick={(e) => {
            e.preventDefault()
            mutation.mutate(articleId)
          }}
        >
          <Icon id="Trash" />
        </ArticleDelButton>
      )}

      {delConfirmArticle !== articleId && (
        <ArticleDelButton
          onClick={(e) => {
            e.preventDefault()
            setDelConfirmArticle(articleId)
          }}
        >
          <Icon id="X" />
        </ArticleDelButton>
      )}
    </>
  )
}

const ArticleDelButton = styled.button`
  color: hsl(var(--red));
  height: 1.125rem;
  font-size: 1.125rem;
  font-weight: 500;

  &:hover {
    color: hsl(var(--red) / 0.5);
  }
`
