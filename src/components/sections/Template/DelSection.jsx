import React from 'react'
import styled from 'styled-components'

import { URL } from '../../../constants'

import Icon from '../../icons/Icon'

export default function DelSection({ section_id }) {
  async function handleDeleteSection(section_id) {
    const response = await fetch(`${URL}/section/?section_id=${section_id}`, {
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
    <SideButtonWrapper>
      <SideButton onClick={() => handleDeleteSection(section_id)}>
        <Icon id="Trash" />
      </SideButton>
    </SideButtonWrapper>
  )
}

const SideButtonWrapper = styled.div`
  display: grid;
  place-items: center;
`

const SideButton = styled.button`
  height: 2rem;

  &:hover {
    color: red;
  }
`
