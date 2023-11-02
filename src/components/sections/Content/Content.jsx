import React from 'react'
import styled from 'styled-components'

import Section from './Section'
import NewSection from './NewSection'

import ContextMenuProvider from '../../utils/ContextMenuProvider'

import { calculateNeighbours } from '../../utils/calculateNeighbours'
import { calculateNewPosition } from '../../utils/calcNewPosition'

export default function Content({ sections }) {
  const [sectionOpenArray, setSectionOpenArray] = React.useState([])

  function toggleSection(e, section_id) {
    if (e.shiftKey) {
      toggleSectionAll(section_id)
      return
    }

    if (!sectionOpenArray.includes(section_id)) {
      const newIsSectionOpen = [...sectionOpenArray, section_id]
      setSectionOpenArray(newIsSectionOpen)
      return
    }
    const newIsSectionOpen = sectionOpenArray.filter((id) => id !== section_id)
    setSectionOpenArray(newIsSectionOpen)
  }
  // shift clicking will open or close all depending on the current open status of clicked title
  function toggleSectionAll(section_id) {
    if (sectionOpenArray.includes(section_id)) {
      setSectionOpenArray([])
      return
    }
    const newIsSectionOpen = []
    sections.forEach((section) => newIsSectionOpen.push(section.id))
    setSectionOpenArray(newIsSectionOpen)
  }

  return (
    <Wrapper>
      <SectionList>
        {sections.map((section, index) => {
          return (
            <ContextMenuProvider
              key={section.id}
              container="section"
              data={section}
              neighbours={calculateNeighbours(sections, index)}
            >
              <Section
                section={section}
                toggleSection={toggleSection}
                isSectionOpen={sectionOpenArray.includes(section.id)}
              />
            </ContextMenuProvider>
          )
        })}
      </SectionList>

      <NewSection section_position={calculateNewPosition(sections)} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  gap: 16px;
`

const SectionList = styled.ul`
  display: grid;
  gap: 16px;
`
