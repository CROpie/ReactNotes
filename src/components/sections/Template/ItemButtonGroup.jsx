import React from 'react'
import styled from 'styled-components'

import Icon from '../../icons/Icon'

import DelItem from './DelItem'

export default function ItemButtonGroup({ item_id, index, shiftPosition, article_id }) {
  return (
    <ItemButtonWrapper>
      <SideButton onClick={() => shiftPosition(item_id, index, 'up')}>
        <Icon id="UpArrow" />
      </SideButton>

      <DelItem item_id={item_id} article_id={article_id} />

      <SideButton>
        <Icon id="DownArrow" onClick={() => shiftPosition(item_id, index, 'down')} />
      </SideButton>
    </ItemButtonWrapper>
  )
}

const SideButton = styled.button`
  height: 1rem;

  &:hover {
    color: red;
  }
`

const ItemButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  & > button {
    transition: opacity 1s;
    opacity: 0;
    pointer-events: none;
  }

  &:hover > button {
    opacity: 1;
    pointer-events: auto;
  }
`
