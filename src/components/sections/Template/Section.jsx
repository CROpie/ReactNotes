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

import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function Section({ section }) {
  const { items, id: section_id, article_id } = section

  const queryClient = useQueryClient()

  const [newElement, setNewElement] = React.useState()
  const [newElementPosition, setNewElementPosition] = React.useState()

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

  const renderElement = (element, text) => {
    switch (element) {
      case 'h1':
        return <H1>{text}</H1>
      case 'p':
        return <P>{text}</P>
      case 'code':
        return <PrismCodeblock codeBlock={text} />
      default:
        return <div>{text}</div>
    }
  }

  return (
    <SectionWrapper>
      <SectionList>
        {/* The data itself */}
        {items.map(({ element, text, id: item_id }, index) => (
          <ItemWrapper key={item_id}>
            <ItemButtonGroup
              item_id={item_id}
              index={index}
              shiftPosition={shiftPosition}
              article_id={article_id}
            />
            <SectionListItem> {renderElement(element, text)}</SectionListItem>
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

const P = styled.p`
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
