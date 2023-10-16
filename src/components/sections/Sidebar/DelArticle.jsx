import React from 'react'
import styled from 'styled-components'

import { URL } from '../../../constants'

import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function DelArticle({ articleId }) {
  const [delConfirmArticle, setDelConfirmArticle] = React.useState()

  const queryClient = useQueryClient()

  async function handleDeleteArticle(articleId) {
    const response = await fetch(`${URL}/article/?article_id=${articleId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }
    return response.json()
  }

  const mutation = useMutation({
    mutationFn: async (articleId) => handleDeleteArticle(articleId),
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
        <button onClick={() => mutation.mutate(articleId)}>DEL</button>
      )}

      {delConfirmArticle !== articleId && (
        <button onClick={() => setDelConfirmArticle(articleId)}>X</button>
      )}
    </>
  )
}
