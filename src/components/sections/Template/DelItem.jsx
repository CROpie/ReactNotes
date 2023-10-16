import React from 'react'
import styled from 'styled-components'

import { URL } from '../../../constants'

import Icon from '../../icons/Icon'

export default function DelItem({ item_id }) {
  const [delConfirmItem, setDelConfirmItem] = React.useState()

  async function handleDeleteItem(item_id) {
    const response = await fetch(`${URL}/item/?item_id=${item_id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) {
      console.log('something went wrong..')
      return
    }
    const json = await response.json()
    console.log(json)
  }

  return (
    <SideButtonWrapperDel>
      {delConfirmItem === item_id && (
        <SideButton onClick={() => handleDeleteItem(item_id)}>
          <Icon id="Trash" />
        </SideButton>
      )}
      {delConfirmItem !== item_id && (
        <SideButton onClick={() => setDelConfirmItem(item_id)}>
          <Icon id="X" />
        </SideButton>
      )}
    </SideButtonWrapperDel>
  )
}

const SideButtonWrapper = styled.div`
  display: grid;
  place-items: center;
`

const SideButtonWrapperDel = styled(SideButtonWrapper)`
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

const SideButton = styled.button`
  height: 1rem;

  &:hover {
    color: red;
  }
`
