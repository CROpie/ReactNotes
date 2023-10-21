import React from 'react'
import styled from 'styled-components'

import NewElementInput from './NewElementInput'
import ElementSelect from './ElementSelect'

import Icon from '../../icons/Icon'

export default function NewItem({ section_id, new_item_position }) {
  const [newElementSection, setNewElementSection] = React.useState()
  const [newElementTag, setNewElementTag] = React.useState()

  function handleClickCreateNewElement(section_id) {
    if (section_id === newElementSection) {
      setNewElementSection(undefined)
      return
    }
    setNewElementSection(section_id)
  }
  /*
    Pressing NewElementButton will cause both NewElementInput and ElementSelect to appear
    in the current section.
    */
  return (
    <>
      <ItemWrapper>
        {newElementSection === section_id && (
          <NewElementInput
            new_item_position={new_item_position}
            section_id={section_id}
            newElementTag={newElementTag}
          />
        )}
      </ItemWrapper>

      <ItemWrapper>
        <SideButtonWrapper onClick={() => handleClickCreateNewElement(section_id)}>
          {newElementSection ? <Icon id="MinusPage" /> : <Icon id="PlusPage" />}
        </SideButtonWrapper>

        {newElementSection === section_id && <ElementSelect setNewElementTag={setNewElementTag} />}
      </ItemWrapper>
    </>
  )
}

const ItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 4rem 1fr;
`

const SideButtonWrapper = styled.button`
  display: grid;
  place-items: center;
  height: 2rem;
  color: var(--text-color);

  &:hover {
    color: lime;
  }
`
