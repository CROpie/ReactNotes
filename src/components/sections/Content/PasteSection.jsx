import React from 'react'
import styled from 'styled-components'

import { useParams } from 'react-router-dom'
import { BaseURL } from '../../../constants'
import Icon from '../../icons/Icon'
import { useQueryClient, useMutation } from '@tanstack/react-query'

export default function PasteSection({ section_position }) {
  const { article_id: articleID } = useParams()
  const article_id = parseInt(articleID)

  const queryClient = useQueryClient()

  async function getClipboardData() {
    if (navigator.clipboard) {
      try {
        const clipboardText = await navigator.clipboard.readText()
        return JSON.parse(clipboardText)
      } catch (error) {
        console.log('Error reading clipboard data:', error)
      }
    } else {
      console.log('Clipboard API is not supported.')
    }
  }

  async function pasteSection() {
    const jsonObject = await getClipboardData()

    const response = await fetch(`${BaseURL}/sectionpaste`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section_position,
        article_id,
        items: jsonObject.items,
        title: jsonObject.title,
      }),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }
    return response.json()
  }

  const mutation = useMutation({
    mutationFn: async () => pasteSection(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sections', article_id] })
    },
    onError: (error) => {
      console.error('onError something went wrong...', error)
    },
  })

  return (
    <Wrapper>
      <Button type="button" onClick={() => mutation.mutate()}>
        <Icon id="Paste" />
      </Button>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: grid;
  place-items: center;
  & > button {
    transition: opacity 1s;
    opacity: 0;
    pointer-events: none;
  }

  &:hover > button {
    opacity: 1;
    pointer-events: auto;
  }
`
const Button = styled.button`
  color: hsl(var(--white));
  height: 2rem;

  &:hover {
    color: hsl(var(--green));
  }
`
