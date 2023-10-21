import React from 'react'
import styled from 'styled-components'

import Icon from '../../icons/Icon'

import { BaseURL } from '../../../constants'

import { H1_style, H2_style, H3_style, P_style } from '../../styles/mixins'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import ResizeTextArea from '../../utils/ResizeTextArea'
import ResizeTextAreaP from '../../utils/ResizeTextAreaP'

export default function EditItem({ item, editingText, setEditingText, setIsEditing }) {
  const { element, text, id: item_id, image } = item

  const { article_id: articleID } = useParams()
  const article_id = parseInt(articleID)

  const queryClient = useQueryClient()

  async function patchItemText({ item_id }) {
    const response = await fetch(`${BaseURL}/itemtext/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item_id, text: editingText }),
    })
    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }
    return response.json()
  }

  const editMutation = useMutation({
    mutationFn: async ({ item_id }) => patchItemText({ item_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sections', article_id] })
      setIsEditing(0)
      setEditingText('')
    },
    onError: (error) => {
      console.error('onError something went wrong...', error)
    },
  })

  const renderEditElement = (element, text, item_id) => {
    switch (element) {
      case 'h1':
        return <InputH1 value={editingText} onChange={(e) => setEditingText(e.target.value)} />
      case 'h2':
        return <InputH2 value={editingText} onChange={(e) => setEditingText(e.target.value)} />
      case 'h3':
        return <InputH3 value={editingText} onChange={(e) => setEditingText(e.target.value)} />
      case 'a':
        return <InputP value={editingText} onChange={(e) => setEditingText(e.target.value)} />
      case 'p':
        return <ResizeTextAreaP text={editingText} setText={setEditingText} />
      case 'code':
        return <ResizeTextArea text={editingText} setText={setEditingText} />
      // return <PrismCodeblock codeBlock={text} />
      default:
        return <div>{text}</div>
    }
  }

  return (
    <div>
      <SectionListItem>{renderEditElement(element, text, item_id)}</SectionListItem>
      <EditButtonsWrapper>
        <EditSaveWrapper onClick={() => editMutation.mutate({ item_id })}>
          <Icon id="Save" />
        </EditSaveWrapper>
        <EditCancelWrapper
          onClick={() => {
            setIsEditing(0)
            setEditingText('')
          }}
        >
          <Icon id="X" />
        </EditCancelWrapper>
      </EditButtonsWrapper>
    </div>
  )
}

const SectionListItem = styled.li`
  align-self: center;
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

const InputH1 = styled.input`
  ${H1_style}
  background: transparent;
`

const InputH2 = styled.input`
  ${H2_style}
  background: transparent;
`

const InputH3 = styled.input`
  ${H3_style}
  background: transparent;
`

const InputP = styled.input`
  font-size: 1.25rem;
  ${P_style}
  background: transparent;
`
