import React from 'react'

const testData = {
  headings: [{ heading_id: 1, text: 'This is a heading', element: 'h1', section_id: 1 }],
  texts: [{ text_id: 1, text: 'This is some text', element: 'p', section_id: 2 }],
}

export default function RQTwo() {
  const renderElement = (element, text, key) => {
    switch (element) {
      case 'h1':
        return <h1 key={key}>{text}</h1>
      case 'p':
        return <p key={key}>{text}</p>
      // Add more cases for other element types as needed
      default:
        return <div key={key}>{text}</div>
    }
  }

  const renderDynamicElements = (data, sectionId) => {
    const elements = []
    data.forEach((item) => {
      if (item.section_id === sectionId) {
        elements.push(renderElement(item.element, item.text, item.heading_id || item.text_id))
      }
    })
    return elements
  }

  const renderAllElements = () => {
    const elementsBySection = {}

    testData.headings.forEach((item) => {
      if (!elementsBySection[item.section_id]) {
        elementsBySection[item.section_id] = []
      }
      elementsBySection[item.section_id].push(item)
    })

    testData.texts.forEach((item) => {
      if (!elementsBySection[item.section_id]) {
        elementsBySection[item.section_id] = []
      }
      elementsBySection[item.section_id].push(item)
    })

    const allSectionIds = Array.from(
      new Set([...testData.headings, ...testData.texts]).map((item) => item.section_id)
    )

    const allElements = []

    allSectionIds.forEach((sectionId) => {
      allElements.push(...renderDynamicElements(elementsBySection[sectionId], sectionId))
    })

    return allElements
  }

  return <div>{renderAllElements()}</div>
}
