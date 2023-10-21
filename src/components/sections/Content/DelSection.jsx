import React from 'react'
import styled from 'styled-components'

import { BaseURL } from '../../../constants'

import Icon from '../../icons/Icon'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useParams } from 'react-router-dom'

export default function DelSection({ section_id }) {
  const { article_id: articleID } = useParams()
  const article_id = parseInt(articleID)

  const queryClient = useQueryClient()

  async function deleteSection(section_id) {
    const response = await fetch(`${BaseURL}/section/?section_id=${section_id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }
    return response.json()
  }

  const mutation = useMutation({
    mutationFn: async (section_id) => deleteSection(section_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sections', article_id] })
    },
    onError: (error) => {
      console.error('onError something went wrong...', error)
    },
  })

  return (
    <SideButtonWrapper>
      <SideButton onClick={() => mutation.mutate(section_id)}>
        <Icon id="Trash" />
      </SideButton>
    </SideButtonWrapper>
  )
}

const SideButtonWrapper = styled.div`
  display: grid;
  place-items: center;
`

const SideButton = styled.button`
  height: 2rem;
  color: var(--text-color);

  &:hover {
    color: red;
  }
`
