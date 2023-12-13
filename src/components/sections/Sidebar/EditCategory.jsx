import React from 'react'
import styled from 'styled-components'

import { EditContext } from '../../../contexts/EditCtx'
import { useEditMutation } from '../../utils/useEditMutation'

import Icon from '../../icons/Icon'

export default function EditCategory({ category_id, category_name }) {
  const [editCategoryName, setEditCategoryName] = React.useState(category_name)

  const { setIsEdit } = React.useContext(EditContext)

  const { mutate: editMutate } = useEditMutation()

  const editRef = React.useRef()

  async function handleSubmit() {
    editMutate(
      {
        container: 'category',
        body: { id: category_id, text: editCategoryName },
      },
      {
        onSuccess: () => {
          setIsEdit(``)
          //   setIsPostError(false)
        },
        // onError: () => setIsPostError(true),
      }
    )
  }

  React.useEffect(() => {
    editRef.current.focus()
    editRef.current.select()
    // document.execCommand('selectAll')
  }, [])

  return (
    <CategoryEditDiv>
      <CategoryEditInput
        value={editCategoryName}
        onChange={(e) => setEditCategoryName(e.target.value)}
        ref={editRef}
      />
      <EditButtonsWrapper>
        <EditSaveWrapper onClick={handleSubmit}>
          <Icon id="Save" />
        </EditSaveWrapper>
        <EditCancelWrapper
          onClick={() => {
            setIsEdit(``)
            setEditCategoryName(category_name)
          }}
        >
          <Icon id="X" />
        </EditCancelWrapper>
      </EditButtonsWrapper>
    </CategoryEditDiv>
  )
}

const CategoryEditDiv = styled.div`
  padding: 10px 16px;

  border: 2px dashed hsl(var(--red));
  color: hsl(var(--black));
  background: var(--primary);
`

const CategoryEditInput = styled.input`
  width: 100%;
  text-align: start;

  font-size: 1.5rem;
  font-weight: 700;

  border: none;
  outline: none;
  color: hsl(var(--black));
  background: transparent;
`

const EditButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-content: center;
  margin: 0 auto;

  margin-top: 1rem;
`

const EditSaveWrapper = styled.button`
  height: 2rem;
  color: hsl(var(--black));

  &:hover {
    color: lime;
  }
`

const EditCancelWrapper = styled.button`
  height: 2rem;
  color: hsl(var(--black));
  &:hover {
    color: red;
  }
`
