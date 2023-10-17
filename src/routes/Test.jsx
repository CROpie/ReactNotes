import React from 'react'
import styled from 'styled-components'

import { URL as url } from '../constants'
import { Link } from 'react-router-dom'

export default function Test() {
  const [downloadedImage, setDownloadedImage] = React.useState('')
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    async function getSections() {
      console.log('Fetching sections...')
      const response = await fetch(`${url}/section?article_id=1`)
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

  return (
    <div>
      <Link to="/">Home</Link>
      <h6>Something</h6>
      {downloadedImage && (
        <div>
          <img alt="" src={downloadedImage} height={'100%'} />
        </div>
      )}
      <button onClick={handleClick}>Button</button>
    </div>
  )
}
