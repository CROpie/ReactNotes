import React from 'react'
import styled from 'styled-components'
import useContextMenu from './useContextMenu'

import Icon from '../icons/Icon'
import { SidebarContext } from '../../contexts/SidebarCtx'
import { EditContext } from '../../contexts/EditCtx'
import { ContextMenuContext } from '../../contexts/ContextMenuCtx'

import { useDeleteMutation } from './useDeleteMutation'
import { usePatchPositionMutation } from './usePatchPositionMutation'
import { usePasteMutation } from './usePasteMutation'
import { useGetNestedMutation } from './useGetNestedMutation'

import { copyToClipboard } from './copyToClipboard'
import { calculateNewPosition } from './calcNewPosition'
import { calculateNeighbours } from './calculateNeighbours'

export default function ContextMenuProvider({ container, data, neighbours, children }) {
  const { clicked, setClicked, points, setPoints, componentId } = useContextMenu()

  const { isAllowedDelete } = React.useContext(SidebarContext)
  const { setIsEdit } = React.useContext(EditContext)
  const { cutCopy, setCutCopy } = React.useContext(ContextMenuContext)

  const { mutate: deleteMutate } = useDeleteMutation()
  const { mutate: patchPositionMutate } = usePatchPositionMutation()
  const { mutate: pasteMutate } = usePasteMutation()
  const { mutate: getNestedMutate } = useGetNestedMutation()

  return (
    <Wrapper
      onContextMenu={(e) => {
        e.preventDefault()
        e.stopPropagation()
        setClicked(componentId)

        // due to shifting down sidebar by the height of the header, need to adjust the clicked y-value for category && article
        // --header-height + 1.25rem
        const YAdjustAmount = 16 * (3 + 1.25)
        const adjustedY = e.pageY - (container === 'category' || 'article' ? YAdjustAmount : 0)

        setPoints({ x: e.pageX, y: adjustedY })
      }}
    >
      {children}
      {clicked === componentId && (
        <ContextMenu $top={points.y} $left={points.x}>
          <Button
            onClick={() =>
              patchPositionMutate({ container, id: data.id, swap_id: neighbours.above })
            }
          >
            <StyledIcon id="UpArrow" /> Shift Up
          </Button>

          <Button
            onClick={() =>
              patchPositionMutate({ container, id: data.id, swap_id: neighbours.below })
            }
          >
            <StyledIcon id="DownArrow" />
            Shift Down
          </Button>

          <Button onClick={() => setIsEdit(`${container}-${data.id}`)}>
            <StyledIcon id="Edit" />
            Edit
          </Button>

          <Button
            onClick={() => {
              if (container === 'category' || container === 'article') {
                getNestedMutate({ container, id: data.id })
              }
              if (container === 'section' || container === 'item') {
                copyToClipboard(data)
                setCutCopy('copy')
              }
            }}
          >
            <StyledIcon id="Copy" />
            Copy
          </Button>

          <Button
            onClick={() => {
              if (container === 'category' || container === 'article') {
                getNestedMutate({ container, id: data.id })
                setCutCopy('cut')
              }
              if (container === 'section' || container === 'item') {
                copyToClipboard(data)
                setCutCopy('cut')
              }
            }}
          >
            <StyledIcon id="Cut" />
            Cut
          </Button>

          <Button
            onClick={() => {
              let parent_id = null
              if (container === 'item') {
                parent_id = data.section_id
              } else if (container === 'section') {
                parent_id = data.article_id
              } else if (container === 'article') {
                parent_id = data.category_id
              }
              const newPosition = calculateNewPosition(container)

              pasteMutate({ container, newPosition, parent_id, cutCopy })
            }}
          >
            <StyledIcon id="Paste" /> Paste
          </Button>

          {isAllowedDelete && (
            <Button onClick={() => deleteMutate({ container, id: data.id })}>
              <StyledIcon id="Trash" />
              Delete
            </Button>
          )}
        </ContextMenu>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  color: white;
`

const StyledIcon = styled(Icon)`
  height: 1.5rem;
`

const ContextMenu = styled.div`
  position: absolute;
  background-color: hsl(var(--purple));
  padding: 8px 16px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  top: ${(props) => `${props.$top}px`};
  left: ${(props) => `${props.$left}px`};
`

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  color: white;
  font-weight: 800;

  &:hover {
    color: var(--primary);
  }
`
