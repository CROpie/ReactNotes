import React from 'react'
import styled from 'styled-components'

import { BaseURL } from '../../../constants'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { usePostMutation } from '../../utils/usePostMutation'

import Icon from '../../icons/Icon'

export default function NewCategory({ category_position, setIsNewCategory }) {
  const [categoryName, setCategoryName] = React.useState('')
  const [isPostError, setIsPostError] = React.useState(false)

  const { mutate: postMutate } = usePostMutation()

  const categoryInput = React.useRef()

  React.useEffect(() => {
    categoryInput.current.focus()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    // mutation.mutate()
    postMutate(
      {
        container: 'category',
        body: { category_name: categoryName, category_position },
      },
      {
        onSuccess: () => {
          setIsNewCategory(false)
          setIsPostError(false)
        },
        onError: () => setIsPostError(true),
      }
    )
  }

  return (
    <NewCategoryForm onSubmit={(e) => handleSubmit(e)} $isError={isPostError}>
      <NewCategoryInput
        type="text"
        placeholder="Library"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        ref={categoryInput}
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
  background: ${(props) => (props.$isError ? 'red' : 'var(--primary)')};
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
