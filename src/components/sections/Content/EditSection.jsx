import React from 'react'
import styled from 'styled-components'

import { EditContext } from '../../../contexts/EditCtx'
import { useEditMutation } from '../../utils/useEditMutation'

import { H2_style } from '../../styles/mixins'

import Icon from '../../icons/Icon'

export default function EditSection({ section_id, title }) {
  const [editSectionName, setEditSectionName] = React.useState(title)

  const { setIsEdit } = React.useContext(EditContext)

  const { mutate: editMutate } = useEditMutation()

  const editRef = React.useRef()

  async function handleSubmit() {
    editMutate(
      {
        container: 'section',
        body: { id: section_id, text: editSectionName },
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
  }, [])

  return (
    <SectionEditDiv>
      <SectionEditInput
        value={editSectionName}
        onChange={(e) => setEditSectionName(e.target.value)}
        ref={editRef}
      />
      <EditButtonsWrapper>
        <EditSaveWrapper onClick={handleSubmit}>
          <Icon id="Save" />
        </EditSaveWrapper>
        <EditCancelWrapper
          onClick={() => {
            setIsEdit(``)
            setEditSectionName(title)
          }}
        >
          <Icon id="X" />
        </EditCancelWrapper>
      </EditButtonsWrapper>
    </SectionEditDiv>
  )
}

const SectionEditDiv = styled.div``

const SectionEditInput = styled.input`
  width: 100%;
  text-align: start;

  font-size: 1.125rem;
  font-weight: 500;

  ${H2_style}

  border: none;
  outline: none;
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
  color: hsl(var(--white));

  &:hover {
    color: lime;
  }
`

const EditCancelWrapper = styled.button`
  height: 2rem;
  color: hsl(var(--white));
  &:hover {
    color: red;
  }
`
