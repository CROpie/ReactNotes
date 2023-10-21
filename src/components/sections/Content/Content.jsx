import React from 'react'
import styled from 'styled-components'

import Section from './Section'
import NewSection from './NewSection'
import PasteSection from './PasteSection'

import { BaseURL } from '../../../constants'

export default function Content({ sections }) {
  const [sectionOpenArray, setSectionOpenArray] = React.useState([])
  console.log(sections)

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

  /* SHIFT POSITION FUNCTION */

  async function shiftSectionPosition(section_id, index, direction) {
    console.log(section_id)
    let swapSectionId
    if (direction === 'up') {
      if (index === 0) return
      swapSectionId = sections[index - 1].id
    } else if (direction === 'down') {
      if (index === sections.length - 1) return
      swapItemId = sections[index + 1].id
    }
    console.log(swapSectionId)

    // mutation.mutate({ section_id, swapItemId })
    patchSectionPosition(section_id, swapSectionId)
  }

  async function patchSectionPosition(section_id, swapItemId) {
    const response = await fetch(
      `${BaseURL}/sectionposition/?section_1_id=${section_id}&section_2_id=${swapItemId}`,
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

  /* END OF SHIFT POSITION STUFF*/

  return (
    <>
      <ul>
        {sections.map((section, index) => (
          // isSectionOpen.includes(section.id) &&
          <Section
            key={section.id}
            section={section}
            toggleSection={toggleSection}
            isSectionOpen={sectionOpenArray.includes(section.id)}
            index={index}
            shiftSectionPosition={shiftSectionPosition}
          />
        ))}
      </ul>
      <SideButtonWrapper>
        <PasteSection section_position={sections.length} />
        <NewSection section_position={sections.length} />
      </SideButtonWrapper>
    </>
  )
}

const SideButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 4rem 1fr;
  /* border: 2px dotted purple; */
  place-items: center;
`
