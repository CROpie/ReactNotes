import styled from 'styled-components'

const testData = {
  headings: [
    { heading_id: 1, text: 'This is a heading', element: 'h1', section_id: 2 },
    { heading_id: 2, text: 'This is the second heading', element: 'h1', section_id: 1 },
  ],
  texts: [{ text_id: 1, text: 'This is some text', element: 'p', section_id: 3 }],
}

/*
No need to flatten, because no reason to store data separated into headings and paragraphs anyway
Data will be [{section_id: 0, element: "h1", text: "This is a heading}, ...]
In fact, with careful use of index, may not even need section_id either ??hat
*/

export default function RQOne() {
  const arr = []

  function algo(data) {
    let flattened = []
    for (const [key, value] of Object.entries(data)) {
      value.forEach((item) => flattened.push(item))
    }
    console.log(flattened)

    for (let i = 1; i <= flattened.length; i++) {
      const foundItem = flattened.find((item) => item.section_id === i)
      arr.push(foundItem)
    }
    console.log(arr)
  }

  algo(testData)

  const renderElement = (element, text) => {
    switch (element) {
      case 'h1':
        return <h1>{text}</h1>
      case 'p':
        return <p>{text}</p>
      default:
        return <div>{text}</div>
    }
  }

  return <Wrapper>{arr.map(({ element, text }) => renderElement(element, text))}</Wrapper>
}

const Wrapper = styled.section``
