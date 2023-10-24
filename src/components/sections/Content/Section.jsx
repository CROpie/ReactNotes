import React from 'react'
import styled from 'styled-components'

import Item from './Item'
import NewItem from './NewItem'
import { H2_style } from '../../styles/mixins'

import ContextMenuProvider from '../../utils/ContextMenuProvider'
import Icon from '../../icons/Icon'

import { EditContext } from '../../../contexts/EditCtx'
import EditSection from './EditSection'

import { calculateNeighbours } from '../../utils/calculateNeighbours'
import { calculateNewPosition } from '../../utils/calcNewPosition'

export default function Section({ section, toggleSection, isSectionOpen }) {
  const { items, id: section_id, title } = section

  const { isEdit } = React.useContext(EditContext)

  return (
    <Wrapper>
      <TitleWrapper $editing={isEdit === `section-${section_id}` ? 'true' : undefined}>
        {isEdit === `section-${section_id}` ? (
          <EditSection section_id={section_id} title={title} />
        ) : (
          <SectionHeading onClick={(e) => toggleSection(e, section_id)}>
            <Blank />
            <h2>{title}</h2>
            <StyledIcon id={isSectionOpen ? 'ChevronUp' : 'ChevronDown'} />
          </SectionHeading>
        )}
      </TitleWrapper>

      <ItemsWrapper>
        {isSectionOpen && (
          <SectionList>
            {/* The data itself */}
            {items.map((item, index) => {
              return (
                <ContextMenuProvider
                  key={item.id}
                  container="item"
                  data={item}
                  neighbours={calculateNeighbours(items, index)}
                >
                  <Item item={item} index={index} toggleSection={toggleSection} />
                </ContextMenuProvider>
              )
            })}
            {/* NewItemInput + NewElementButton + ElementSelect */}
          </SectionList>
        )}
      </ItemsWrapper>

      <NewItemWrapper>
        {isSectionOpen && (
          <SectionNew>
            <NewItem section_id={section_id} new_item_position={calculateNewPosition(items)} />
          </SectionNew>
        )}
      </NewItemWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  /* border: 1px dashed hsl(var(--green) / 0.5); */
`
const TitleWrapper = styled.div`
  padding-block: 16px;
  background: hsl(var(--code-bg) / 0.75);
  border: ${(props) => (props.$editing ? '2px dashed red' : 'none')};

  &:hover {
    background: hsl(var(--code-bg) / 0.9);
  }
`
const ItemsWrapper = styled.div`
  background: hsl(var(--code-bg) / 0.5);
`

const NewItemWrapper = styled.div`
  background: hsl(var(--code-bg) / 0.5);
`

const SectionList = styled.ul`
  display: grid;
  gap: 16px;
  /* margin-bottom: 16px; */
  padding: 16px;
`

const SectionHeading = styled.button`
  ${H2_style}
  margin: 0 auto;
  /* margin-bottom: 16px; */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: var(--primary);

  /* background: hsl(var(--code-bg) / 0.5); */
  /* margin-top: -16px;
  margin-left: -16px;
  margin-right: -16px; */
`

const StyledIcon = styled(Icon)`
  height: 2rem;
`

const Blank = styled.div`
  height: 2rem;
  width: 2rem;
`

const SectionNew = styled.div`
  padding: 16px;
`
