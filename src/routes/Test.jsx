import React from 'react'
import styled from 'styled-components'

import { BaseURL } from '../constants'
import { Link } from 'react-router-dom'

const dangerousSVG = `

`

const testObj = {
  id: 3,
  section_position: 1,
  article_id: 2,
  items: [
    {
      id: 35,
      item_position: 1,
      element: 'h2',
      text: 'INSTALLATION',
      image: null,
    },
  ],
}

export default function Test() {
  const [downloadedImage, setDownloadedImage] = React.useState('')
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    async function getSections() {
      console.log('Fetching sections...')
      const response = await fetch(`${BaseURL}/section?article_id=1`)
      if (!response.ok) {
        throw new Error('Network response was not ok.')
      }
      const json = await response.json()

      json.forEach((section, index) => {
        console.log('section index: ', index)
        section.items.forEach((item) => {
          if (item.image) {
            const binaryImage = atob(item.image)
            const bytes = new Uint8Array(binaryImage.length)
            for (let i = 0; i < binaryImage.length; i++) {
              bytes[i] = binaryImage.charCodeAt(i)
            }
            const blob = new Blob([bytes], { type: 'image/jpeg' })
            const imageUrl = URL.createObjectURL(blob)
            item.image = imageUrl
          }
        })
      })
      setData(json)
    }
    getSections()
  }, [])

  function handleClick() {
    console.log(data)
    setDownloadedImage(data[0].items[1].image)
  }

  async function copyToClipboard() {
    const sectionString = JSON.stringify(testObj)
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(sectionString)
        // toast.success('Password Copied.')
        console.log('copied')
      } catch (error) {
        console.log('error')
      }
    } else {
      console.log('error')
    }
  }

  return (
    <Wrapper>
      <Link to="/">Home</Link>
      <h6>Something</h6>
      {downloadedImage && (
        <div>
          <img alt="" src={downloadedImage} height={'100%'} />
        </div>
      )}
      <button onClick={handleClick}>Button</button>
      <a>https://en.wikipedia.org/wiki/Peanut</a>
      <SVGContainer dangerouslySetInnerHTML={{ __html: dangerousSVG }} />
      <Button onClick={copyToClipboard}>Copy to clipboard</Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 1400px;
`

const SVG = styled.svg`
  color: black;
`

const SVGContainer = styled.div`
  & > svg {
    max-width: 100%;
    max-height: 1000px;
    width: auto;
    height: auto;
  }
`

const Button = styled.button`
  color: white;
`

/* aspect-ratio: 1/1; */
/* width: 500px;
  & > svg {
    max-height: 500px;
    width: 100%;
  } */
