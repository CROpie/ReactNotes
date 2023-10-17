import React from 'react'
import styled from 'styled-components'

import { URL } from '../../../constants'

import { H1_style, P_style } from '../../styles/mixins'

import Icon from '../../icons/Icon'

import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function NewElement({ item_position, section_id, newElement, article_id }) {
  const [text, setText] = React.useState('')
  const [selectedImage, setSelectedImage] = React.useState(null)

  const queryClient = useQueryClient()

  async function saveNewElement() {
    let image_id = null
    if (selectedImage) {
      image_id = await saveNewElementImage()
    }
    const item = {
      item_position,
      section_id,
      element: newElement,
      url: null,
      text,
      image_id,
    }
    console.log(item)

    const response = await fetch(`${URL}/item`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }
    return response.json()
  }

  async function saveNewElementImage() {
    const formData = new FormData()
    formData.append('file', selectedImage)
    const response = await fetch(`${URL}/uploadfile`, {
      method: 'POST',
      body: formData,
    })
    const json = await response.json()
    console.log(json)
    return json.id
  }

  const mutation = useMutation({
    mutationFn: async () => saveNewElement(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sections', article_id] })
      setText('')
    },
    onError: (error) => {
      console.error('onError something went wrong...', error)
    },
  })

  return (
    <>
      {newElement && (
        <SideButtonWrapper>
          <SideButton onClick={() => mutation.mutate()}>
            <Icon id="Save" />
          </SideButton>
        </SideButtonWrapper>
      )}
      {newElement === 'h1' && (
        <H1Input placeholder="HEADING" value={text} onChange={(e) => setText(e.target.value)} />
      )}
      {newElement === 'p' && (
        <PInput placeholder="TEXT" value={text} onChange={(e) => setText(e.target.value)} />
      )}
      {newElement === 'code' && (
        <textarea placeholder="TEXT" value={text} onChange={(e) => setText(e.target.value)} />
      )}
      {newElement === 'img' && (
        <input type="file" onChange={(e) => setSelectedImage(e.target.files[0])} />
      )}
    </>
  )
}

const Wrapper = styled.section``

const H1Input = styled.input`
  ${H1_style}
`

const PInput = styled.input`
  ${P_style}
`

const SideButtonWrapper = styled.div`
  display: grid;
  place-items: center;
`

const SideButton = styled.button`
  border: 2px solid purple;
  height: 2rem;
  &:hover {
    color: lime;
  }
`
