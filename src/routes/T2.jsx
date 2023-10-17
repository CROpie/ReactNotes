import React from 'react'
import styled from 'styled-components'

import { URL as url } from '../constants'

export default function Test() {
  const [selectedImage, setSelectedImage] = React.useState(null)
  const [downloadedImage, setDownloadedImage] = React.useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('file', selectedImage)
    const response = await fetch(`${url}/uploadfile`, {
      method: 'POST',
      body: formData,
    })
    const json = await response.json()
    console.log(json)
  }

  React.useEffect(() => {
    async function getImage() {
      const response = await fetch(`${url}/filetwo?item_id=3`)
      if (!response.ok) {
        throw new Error('Network response was not ok.')
      }
      const json = await response.json()
      console.log(json)
      return
      const binaryImage = atob(json)
      const bytes = new Uint8Array(binaryImage.length)

      for (let i = 0; i < binaryImage.length; i++) {
        bytes[i] = binaryImage.charCodeAt(i)
      }

      const blob = new Blob([bytes], { type: 'image/jpeg' })
      const imageUrl = URL.createObjectURL(blob)
      setDownloadedImage(imageUrl)

      /* when retrieving the image info as a blob directly */
      // URL.revokeObjectURL(imageUrl)
      // const blob = await response.blob()
      // console.log(blob)
      // const imageUrl = URL.createObjectURL(blob)
      // setDownloadedImage(imageUrl)
    }
    getImage()
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      {selectedImage && (
        <div>
          <img alt="" height={'100%'} src={URL.createObjectURL(selectedImage)} />
          {/* <img alt="" width={'250px'} src={URL.createObjectURL(selectedImage)} /> */}
        </div>
      )}
      <input type="file" onChange={(e) => setSelectedImage(e.target.files[0])} />
      <button type="submit">Submit</button>
      {downloadedImage && (
        <div>
          <img alt="" src={downloadedImage} height={'100%'} />
        </div>
      )}
    </form>
  )
}
