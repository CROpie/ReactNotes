import React from 'react'
import styled from 'styled-components'

import { BaseURL } from '../../../constants'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import Icon from '../../icons/Icon'

export default function NewCategory({ setIsNewCategory }) {
  const [categoryName, setCategoryName] = React.useState('')

  const queryClient = useQueryClient()

  async function postCategory() {
    const response = await fetch(`${BaseURL}/category`, {
      method: 'POST',
      body: JSON.stringify({ category_name: categoryName }),
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }
    return response.json()
  }

  const mutation = useMutation({
    mutationFn: async () => postCategory(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      setIsNewCategory(false)
    },
    onError: (error) => {
      console.error('onError something went wrong...', error)
    },
  })

  return (
    <NewCategoryForm
      onSubmit={(e) => {
        e.preventDefault()
        mutation.mutate()
      }}
    >
      <NewCategoryInput
        type="text"
        placeholder="Library"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <IconWrapper type="submit">
        <Icon id="Save" />
      </IconWrapper>
    </NewCategoryForm>
  )
}

const NewCategoryForm = styled.form`
  width: 100%;

  display: flex;
  align-items: center;

  font-size: 1.5rem;
  font-weight: 700;

  padding: 10px 16px;

  border: 2px solid hsl(var(--black));
  color: hsl(var(--black));
  background: var(--primary);
`

const NewCategoryInput = styled.input`
  font: inherit;
  border: none;
  background: transparent;
  outline: none;
`

const IconWrapper = styled.button`
  height: 1.5rem;

  &:hover {
    color: var(--highlight);
  }
`

/* 2 things required for getting the error to work:
  1) For fetch, 4xx & 5xx status codes don't give errors. So need to use if !response.ok throw new error
  2) mutationFn: async () => handleSubmitNewCategory()
  the arrow function automatically includes returning the value of the function, therefore will return the error to onError
  Therefore if it is async () => { handleSubmitNewCategory() }, this doesn't return anything! So onSuccess will be triggered
  */
