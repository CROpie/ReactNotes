import React from 'react'
import styled from 'styled-components'

import { URL } from '../../../constants'

import NewElement from './NewElement'

import { H1_style, P_style } from '../../styles/mixins'
import DelSection from './DelSection'
import PrismCodeblock from './PrismCodeblock'
import ElementSelect from './ElementSelect'
import NewElementButton from './NewElementButton'
import ItemButtonGroup from './ItemButtonGroup'

import Icon from '../../icons/Icon'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import ResizeTextArea from '../../utils/ResizeTextArea'

export default function Section({ section }) {
  const { items, id: section_id, article_id } = section

  const queryClient = useQueryClient()

  const [newElement, setNewElement] = React.useState()
  const [newElementPosition, setNewElementPosition] = React.useState()

  const [isEditing, setIsEditing] = React.useState(0)
  const [editingText, setEditingText] = React.useState('')

  function handleClickCreateNewElement(item_id) {
    if (item_id === newElementPosition) {
      setNewElementPosition(undefined)
      return
    }
    setNewElementPosition(item_id)
  }

  function calculateNewItemPosition() {
    let highest = 0
    for (let i = 0; i < items.length; i++) {
      if (items[i].id > highest) {
        highest = items[i].id
      }
    }
    return highest + 1
  }

  async function shiftPosition(item_id, index, direction) {
    let swapItemId
    if (direction === 'up') {
      if (index === 0) return

      swapItemId = items[index - 1].id
    } else if (direction === 'down') {
      if (index === items.length - 1) return
      swapItemId = items[index + 1].id
    }

    mutation.mutate({ item_id, swapItemId })
  }

  async function patchItemPosition({ item_id, swapItemId }) {
    const response = await fetch(
      `${URL}/itemposition/?item_1_id=${item_id}&item_2_id=${swapItemId}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      }
    )
    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }
    return response.json()
  }

  const mutation = useMutation({
    mutationFn: async ({ item_id, swapItemId }) => patchItemPosition({ item_id, swapItemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sections', article_id] })
    },
    onError: (error) => {
      console.error('onError something went wrong...', error)
    },
  })

  async function patchItemText({ item_id }) {
    const data = JSON.stringify({ id: item_id, text: editingText })
    const response = await fetch(`${URL}/itemtext/`, {
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

  const renderElement = (element, text, item_id, image) => {
    switch (element) {
      case 'h1':
        return (
          <H1
            onDoubleClick={() => {
              setIsEditing(item_id)
              setEditingText(text)
            }}
          >
            {text}
          </H1>
        )
      case 'p':
        return (
          <P
            onDoubleClick={() => {
              setIsEditing(item_id)
              setEditingText(text)
            }}
          >
            {text}
          </P>
        )
      case 'code':
        return (
          <div
            onDoubleClick={() => {
              setIsEditing(item_id)
              setEditingText(text)
            }}
          >
            <PrismCodeblock codeBlock={text} />
          </div>
        )
      case 'img':
        return (
          <ImageContainer>
            <Image src={image} alt="" height="100%" />
          </ImageContainer>
        )
      default:
        return <div>{text}</div>
    }
  }

  const renderEditElement = (element, text, item_id) => {
    switch (element) {
      case 'h1':
        return <InputH1 value={editingText} onChange={(e) => setEditingText(e.target.value)} />
      case 'p':
        return <InputP value={editingText} onChange={(e) => setEditingText(e.target.value)} />
      case 'code':
        return <ResizeTextArea text={editingText} setText={setEditingText} />
      // return <PrismCodeblock codeBlock={text} />
      default:
        return <div>{text}</div>
    }
  }

  return (
    <SectionWrapper>
      <SectionList>
        {/* The data itself */}
        {items.map(({ element, text, id: item_id, image }, index) => (
          <ItemWrapper key={item_id}>
            <ItemButtonGroup
              item_id={item_id}
              index={index}
              shiftPosition={shiftPosition}
              article_id={article_id}
            />
            {isEditing !== item_id && (
              <SectionListItem> {renderElement(element, text, item_id, image)}</SectionListItem>
            )}
            {isEditing === item_id && (
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
            )}
          </ItemWrapper>
        ))}

        {/* Position where new items are created */}
        <ItemWrapper>
          {newElementPosition === section_id && (
            <NewElement
              item_position={calculateNewItemPosition()}
              section_id={section_id}
              article_id={article_id}
              newElement={newElement}
            />
          )}
        </ItemWrapper>

        {/* New element button */}
        <ItemWrapper>
          <NewElementButton
            section_id={section_id}
            handleClickCreateNewElement={handleClickCreateNewElement}
          />
          {newElementPosition === section_id && <ElementSelect setNewElement={setNewElement} />}
        </ItemWrapper>

        {/* Allow removal of sections only when they have no items remaining */}
        {items.length < 1 && (
          <ItemWrapper>
            <DelSection section_id={section_id} article_id={article_id} />
          </ItemWrapper>
        )}
      </SectionList>
    </SectionWrapper>
  )
}

const SectionWrapper = styled.section`
  padding-block: 16px;
  border-top: 2px dotted lightblue;
`

const SectionList = styled.ul`
  display: grid;
  gap: 16px;
`

const H1 = styled.h1`
  ${H1_style}
`

const InputH1 = styled.input`
  ${H1_style}
`

const P = styled.p`
  font-size: 1.25rem;
  ${P_style}
`
const InputP = styled.input`
  font-size: 1.25rem;
  ${P_style}
`

const ItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 4rem 1fr;
`

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

  &:hover {
    color: lime;
  }
`

const EditCancelWrapper = styled.button`
  height: 2rem;
  &:hover {
    color: red;
  }
`

const ImageContainer = styled.div`
  height: 500px;
  margin: 0 auto;
  border: 2px solid lime;
`

const Image = styled.img`
  margin: 0 auto;
`
