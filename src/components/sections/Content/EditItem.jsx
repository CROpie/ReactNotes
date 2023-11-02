import React from 'react'
import styled from 'styled-components'

import Icon from '../../icons/Icon'

import { H1_style, H2_style, H3_style, H4_style, P_style } from '../../styles/mixins'

import { EditContext } from '../../../contexts/EditCtx'

import { useEditMutation } from '../../utils/useEditMutation'

import ListInput from '../Inputs/ListInput'
import AutoResizableTextarea from '../Inputs/AutoResizableTextarea'

export default function EditItem({ item }) {
  const { element, text, id: item_id, image } = item

  const [editItemText, setEditItemText] = React.useState(text)

  const { setIsEdit } = React.useContext(EditContext)

  const { mutate: editMutate } = useEditMutation()

  const editRef = React.useRef()

  async function handleSubmit() {
    editMutate(
      {
        container: 'item',
        body: { id: item_id, text: editItemText },
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

  // React.useEffect(() => {
  //   if (editRef.current) {
  //     editRef.current.focus()
  //     editRef.current.select()
  //   }
  // }, [])

  const renderEditElement = (element, text) => {
    switch (element) {
      case 'h1':
        return (
          <InputH1
            value={editItemText}
            onChange={(e) => setEditItemText(e.target.value)}
            ref={editRef}
          />
        )
      case 'h2':
        return (
          <InputH2
            value={editItemText}
            onChange={(e) => setEditItemText(e.target.value)}
            ref={editRef}
          />
        )
      case 'h3':
        return (
          <InputH3
            value={editItemText}
            onChange={(e) => setEditItemText(e.target.value)}
            ref={editRef}
          />
        )
      case 'h4':
        return (
          <InputH4
            value={editItemText}
            onChange={(e) => setEditItemText(e.target.value)}
            ref={editRef}
          />
        )
      case 'ol':
      case 'ul':
        return (
          <ListInput
            tag={element}
            text={editItemText}
            setText={setEditItemText}
            editRef={editRef}
            edit
          />
        )
      case 'a':
        return (
          <InputP
            value={editItemText}
            onChange={(e) => setEditItemText(e.target.value)}
            ref={editRef}
          />
        )
      case 'p':
        return (
          <AutoResizableTextarea text={editItemText} setText={setEditItemText} editRef={editRef} />
        )

      case 'code':
        return (
          <AutoResizableTextarea text={editItemText} setText={setEditItemText} editRef={editRef} />
        )
      default:
        return (
          <input
            value={editItemText}
            onChange={(e) => setEditItemText(e.target.value)}
            ref={editRef}
          />
        )
    }
  }

  return (
    <ItemEditDiv>
      {renderEditElement(element, text)}
      <EditButtonsWrapper>
        <EditSaveWrapper onClick={handleSubmit}>
          <Icon id="Save" />
        </EditSaveWrapper>
        <EditCancelWrapper
          onClick={() => {
            setIsEdit(``)
            setEditItemText(text)
          }}
        >
          <Icon id="X" />
        </EditCancelWrapper>
      </EditButtonsWrapper>
    </ItemEditDiv>
  )
}

const ItemEditDiv = styled.div`
  /* padding: 4px 16px;

  border: 2px dotted hsl(var(--black));
  color: hsl(var(--black));
  background: var(--primary-hover); */
  /* border: 2px dotted blue; */
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
  color: var(--text-color);

  &:hover {
    color: lime;
  }
`

const EditCancelWrapper = styled.button`
  height: 2rem;
  color: var(--text-color);
  &:hover {
    color: red;
  }
`
const EditInput = `
background: transparent;
outline: none;
border: none;
`

const InputH1 = styled.input`
  ${H1_style}
  ${EditInput}
`

const InputH2 = styled.input`
  ${H2_style}
  ${EditInput}
`

const InputH3 = styled.input`
  ${H3_style}
  ${EditInput}
`

const InputH4 = styled.input`
  ${H4_style}
  ${EditInput}
`

const InputP = styled.input`
  color: hsl(var(--white));
  ${P_style}
  ${EditInput}
`
