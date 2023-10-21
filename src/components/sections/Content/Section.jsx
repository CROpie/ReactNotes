import React from 'react'
import styled from 'styled-components'

import { BaseURL } from '../../../constants'

import DelSection from './DelSection'
import CopySection from './CopySection'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import Item from './Item'
import NewItem from './NewItem'
import { H2_style } from '../../styles/mixins'

import ContextMenuProvider from '../../utils/ContextMenuProvider'
export default function Section({
  section,
  toggleSection,
  isSectionOpen,
  index,
  shiftSectionPosition,
}) {
  const { items, id: section_id, article_id, title } = section
  // console.log('section: ', JSON.stringify(section))

  // moved open state to parent(Content) to allow opening and closing of all on shift-click
  // const [isSectionOpen, setIsSectionOpen] = React.useState(false)

  const queryClient = useQueryClient()

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
      `${BaseURL}/itemposition/?item_1_id=${item_id}&item_2_id=${swapItemId}`,
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

  function contextDelete() {
    console.log('Deleting...')
  }

  const itemContextMenu = [{ id: 1, text: 'Delete', fn: contextDelete }]

  return (
    <SectionWrapper>
      <ItemWrapper>
        <CopySection section={section} />
        <Button onClick={() => shiftSectionPosition(section_id, index, 'up')}>UP</Button>
        {/* <SectionHeading onClick={() => setIsSectionOpen(!isSectionOpen)}>{title}</SectionHeading> */}
        <SectionHeading onClick={(e) => toggleSection(e, section_id)}>{title}</SectionHeading>
      </ItemWrapper>

      {isSectionOpen && (
        <SectionList>
          {/* The data itself */}
          {items.map((item, index) => (
            <ContextMenuProvider menu={itemContextMenu}>
              <Item
                key={item.id}
                item={item}
                index={index}
                shiftPosition={shiftPosition}
                toggleSection={toggleSection}
              />
            </ContextMenuProvider>
          ))}

          {/* NewItemInput + NewElementButton + ElementSelect */}
          <NewItem section_id={section_id} new_item_position={calculateNewItemPosition()} />

          {/* Allow removal of sections only when they have no items remaining */}
          {items.length < 1 && (
            <ItemWrapper>
              <DelSection section_id={section_id} />
            </ItemWrapper>
          )}
        </SectionList>
      )}
    </SectionWrapper>
  )
}

const SectionWrapper = styled.section`
  padding-block: 16px;
  /* border: 1px dotted lightblue; */
`

const SectionList = styled.ul`
  display: grid;
  gap: 16px;
`

const ItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 4rem 1fr;
`

const SectionHeading = styled.button`
  ${H2_style}
`

const Button = styled.button`
  color: white;
`
