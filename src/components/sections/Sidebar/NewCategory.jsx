import React from 'react'
import styled from 'styled-components'

import { URL } from '../../../constants'

export default function NewCategory() {
  const [categoryName, setCategoryName] = React.useState('')

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

  return (
    <NewCategoryForm onSubmit={handleSubmitNewCategory}>
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
