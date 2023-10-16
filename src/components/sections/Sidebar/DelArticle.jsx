import React from 'react'
import styled from 'styled-components'

import { URL } from '../../../constants'

export default function DelArticle({ articleId }) {
  const [delConfirmArticle, setDelConfirmArticle] = React.useState()

  async function handleDeleteArticle(articleId) {
    const response = await fetch(`${URL}/article/?article_id=${articleId}`, {
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
      {delConfirmArticle === articleId && (
        <button onClick={() => handleDeleteArticle(articleId)}>DEL</button>
      )}

      {delConfirmArticle !== articleId && (
        <button onClick={() => setDelConfirmArticle(articleId)}>X</button>
      )}
    </>
  )
}
