import React from 'react'
import styled from 'styled-components'

import { BaseURL } from '../../../constants'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import Icon from '../../icons/Icon'

export default function DelCategory({ categoryId }) {
  const [delConfirmCategory, setDelConfirmCategory] = React.useState()
  const queryClient = useQueryClient()

  async function deleteCategory(categoryId) {
    const response = await fetch(`${BaseURL}/category/?category_id=${categoryId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }
    return response.json()
  }

  const mutation = useMutation({
    mutationFn: async (categoryId) => deleteCategory(categoryId),
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
        <CategoryDelButton
          onClick={(e) => {
            e.stopPropagation()
            mutation.mutate(categoryId)
          }}
        >
          <Icon id="Trash" />
        </CategoryDelButton>
      )}

      {delConfirmCategory !== categoryId && (
        <CategoryDelButton
          onClick={(e) => {
            e.stopPropagation()
            setDelConfirmCategory(categoryId)
          }}
        >
          <Icon id="X" />
        </CategoryDelButton>
      )}
    </>
  )
}

const CategoryDelButton = styled.div`
  color: hsl(var(--red));
  height: 1.5rem;
  font-size: 1.5rem;
  font-weight: 700;

  &:hover {
    color: hsl(var(--red) / 0.5);
  }
`
