import React from 'react'
import styled from 'styled-components'

import { BaseURL } from '../../../constants'

import { H1_style, H2_style, H3_style, P_style } from '../../styles/mixins'

import Icon from '../../icons/Icon'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import ResizeTextArea from '../../utils/ResizeTextArea'
import ResizeTextAreaP from '../../utils/ResizeTextAreaP'

export default function NewElementInput({ new_item_position, section_id, newElementTag }) {
  const [text, setText] = React.useState('')
  const [selectedImage, setSelectedImage] = React.useState(null)

  const { article_id: articleID } = useParams()
  const article_id = parseInt(articleID)

  const queryClient = useQueryClient()

  async function postItem() {
    let image_id = null
    if (selectedImage) {
      image_id = await postImage()
    }
    const item = {
      item_position: new_item_position,
      section_id,
      element: newElementTag,
      text,
      image_id,
    }
    console.log(item)

    const response = await fetch(`${BaseURL}/item`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }
    return response.json()
  }

  async function postImage() {
    const formData = new FormData()
    formData.append('file', selectedImage)
    const response = await fetch(`${BaseURL}/uploadfile`, {
      method: 'POST',
      body: formData,
    })
    const json = await response.json()
    console.log(json)
    return json.id
  }

  const mutation = useMutation({
    mutationFn: async () => postItem(),
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
      {newElementTag && (
        <SideButtonWrapper>
          <SideButton onClick={() => mutation.mutate()}>
            <Icon id="Save" />
          </SideButton>
        </SideButtonWrapper>
      )}
      {newElementTag === 'h1' && (
        <H1Input placeholder="HEADING" value={text} onChange={(e) => setText(e.target.value)} />
      )}
      {newElementTag === 'h2' && (
        <H2Input placeholder="HEADING" value={text} onChange={(e) => setText(e.target.value)} />
      )}
      {newElementTag === 'h3' && (
        <H3Input placeholder="HEADING" value={text} onChange={(e) => setText(e.target.value)} />
      )}
      {newElementTag === 'p' && (
        <ResizeTextAreaP placeholder="TEXT" text={text} setText={setText} />
      )}
      {/* {newElementTag === 'code' && (
        <CodeInput placeholder="TEXT" value={text} onChange={(e) => setText(e.target.value)} />
      )} */}
      {newElementTag === 'code' && (
        <ResizeTextArea placeholder="TEXT" text={text} setText={setText} />
      )}
      {newElementTag === 'img' && (
        <input type="file" onChange={(e) => setSelectedImage(e.target.files[0])} />
      )}
      {newElementTag === 'a' && (
        <PInput placeholder="URL" value={text} onChange={(e) => setText(e.target.value)} />
      )}
      {newElementTag === 'svg' && (
        <PInput
          placeholder="Paste raw SVG data here"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      )}
    </>
  )
}

const Wrapper = styled.section``

const H1Input = styled.input`
  ${H1_style}
  background: transparent;
`

const H2Input = styled.input`
  ${H2_style}
  background: transparent;
`

const H3Input = styled.input`
  ${H3_style}
  background: transparent;
`

const PInput = styled.textarea`
  ${P_style}
  background: transparent;
  color: hsl(var(--white));
`

const SideButtonWrapper = styled.div`
  display: grid;
  place-items: center;
`

const SideButton = styled.button`
  height: 2rem;
  color: var(--text-color);
  &:hover {
    color: lime;
  }
`
