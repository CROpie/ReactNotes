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
    <Wrapper>
      {newElementSection === section_id && (
        <NewElementInput
          new_item_position={new_item_position}
          section_id={section_id}
          newElementTag={newElementTag}
        />
      )}

      <ItemWrapper>
        {newElementSection === section_id && (
          <ElementSelect newElementTag={newElementTag} setNewElementTag={setNewElementTag} />
        )}

        <SideButtonWrapper
          onClick={() => handleClickCreateNewElement(section_id)}
          is_new={newElementSection}
        >
          {newElementSection ? <Icon id="MinusPage" /> : <Icon id="PlusPage" />}
        </SideButtonWrapper>
      </ItemWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  gap: 32px;
`

const ItemWrapper = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
  gap: 8px;
`

const SideButtonWrapper = styled.button`
  height: 2rem;
  color: var(--text-color);

  &:hover {
    color: ${(props) => (props.is_new ? 'hsl(var(--red))' : 'hsl(var(--green))')};
  }
`
