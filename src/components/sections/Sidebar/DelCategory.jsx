import React from 'react'
import styled from 'styled-components'

import { URL } from '../../../constants'

export default function DelCategory({ categoryId }) {
  const [delConfirmCategory, setDelConfirmCategory] = React.useState()

  async function handleDeleteCategory(categoryId) {
    const response = await fetch(`${URL}/category/?category_id=${categoryId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) {
      console.log('something went wrong..')
      return
    }
    const json = await response.json()
    console.log(json)
  }
  return (
    <>
      {delConfirmCategory === categoryId && (
        <CategoryDelButton onClick={() => handleDeleteCategory(categoryId)}>DEL</CategoryDelButton>
      )}

      {delConfirmCategory !== categoryId && (
        <CategoryDelButton onClick={() => setDelConfirmCategory(categoryId)}>X</CategoryDelButton>
      )}
    </>
  )
}

const CategoryDelButton = styled.button`
  color: red;
`
