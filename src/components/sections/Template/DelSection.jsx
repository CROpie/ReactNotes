import React from 'react'
import styled from 'styled-components'

import { URL } from '../../../constants'

import Icon from '../../icons/Icon'

import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function DelSection({ section_id, article_id }) {
  const queryClient = useQueryClient()

  console.log('DelSection: ', article_id)

  async function handleDeleteSection(section_id) {
    console.log('deleting section?')
    const response = await fetch(`${URL}/section/?section_id=${section_id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }
    return response.json()
  }

  const mutation = useMutation({
    mutationFn: async (section_id) => handleDeleteSection(section_id),
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

  &:hover {
    color: red;
  }
`
