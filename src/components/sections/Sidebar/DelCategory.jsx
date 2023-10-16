import React from 'react'
import styled from 'styled-components'

import { URL } from '../../../constants'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import Icon from '../../icons/Icon'

export default function DelCategory({ categoryId }) {
  const [delConfirmCategory, setDelConfirmCategory] = React.useState()
  const queryClient = useQueryClient()

  async function handleDeleteCategory(categoryId) {
    const response = await fetch(`${URL}/category/?category_id=${categoryId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }
    return response.json()
  }

  const mutation = useMutation({
    mutationFn: async (categoryId) => handleDeleteCategory(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (error) => {
      console.error('onError something went wrong...', error)
    },
  })
  return (
    <>
      {delConfirmCategory === categoryId && (
        <CategoryDelButton onClick={() => mutation.mutate(categoryId)}>
          <Icon id="Trash" />
        </CategoryDelButton>
      )}

      {delConfirmCategory !== categoryId && (
        <CategoryDelButton onClick={() => setDelConfirmCategory(categoryId)}>
          <Icon id="X" />
        </CategoryDelButton>
      )}
    </>
  )
}

const CategoryDelButton = styled.button`
  color: red;
  height: 1rem;
`
