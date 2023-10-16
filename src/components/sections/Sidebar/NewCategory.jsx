import React from 'react'
import styled from 'styled-components'

import { URL } from '../../../constants'

import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function NewCategory({ setIsNewCategory }) {
  const [categoryName, setCategoryName] = React.useState('')

  const queryClient = useQueryClient()

  async function handleSubmitNewCategory() {
    const response = await fetch(`${URL}/category`, {
      method: 'POST',
      body: JSON.stringify({ category_name: categoryName }),
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }
    return response.json()
  }

  /* 2 things required for getting the error to work:
  1) For fetch, 4xx & 5xx status codes don't give errors. So need to use if !response.ok throw new error
  2) mutationFn: async () => handleSubmitNewCategory()
  the arrow function automatically includes returning the value of the function, therefore will return the error to onError
  Therefore if it is async () => { handleSubmitNewCategory() }, this doesn't return anything! So onSuccess will be triggered
  */
  const mutation = useMutation({
    mutationFn: async () => handleSubmitNewCategory(),
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
      <button type="submit">*</button>
    </NewCategoryForm>
  )
}

const NewCategoryForm = styled.form`
  display: flex;
`

const NewCategoryInput = styled.input`
  border: none;
  font-size: 1.25rem;
`
