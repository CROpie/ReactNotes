import React from 'react'
import styled from 'styled-components'

import Icon from '../../icons/Icon'

export default function NewElementButton({ section_id, handleClickCreateNewElement }) {
  return (
    <SideButtonWrapper>
      <SideButtonNew onClick={() => handleClickCreateNewElement(section_id)}>
        <Icon id="PlusPage" />
      </SideButtonNew>
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

const SideButtonNew = styled(SideButton)`
  &:hover {
    color: lime;
  }
`
