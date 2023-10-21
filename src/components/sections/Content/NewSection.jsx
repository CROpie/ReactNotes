import React from 'react'
import styled from 'styled-components'
import Icon from '../../icons/Icon'

import { BaseURL } from '../../../constants'
import { useParams } from 'react-router-dom'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { H2_style } from '../../styles/mixins'

export default function NewSection({ section_position }) {
  const { article_id: articleID } = useParams()
  const article_id = parseInt(articleID)

  const [title, setTitle] = React.useState('')
  const [isAddNew, setIsAddNew] = React.useState(false)

  const queryClient = useQueryClient()

  async function postSection() {
    const response = await fetch(`${BaseURL}/section`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section_position, article_id, title }),
    })
    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }
    return response.json()
  }

  const mutation = useMutation({
    mutationFn: async () => postSection(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sections', article_id] })
    },
    onError: (error) => {
      console.error('onError something went wrong...', error)
    },
  })

  return (
    <Wrapper>
      {isAddNew && (
        <NewSectionForm onSubmit={() => mutation.mutate()}>
          <NewSectionInput
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button type="submit">
            <Icon id="Save" />
          </Button>
        </NewSectionForm>
      )}
      <SideButtonNew onClick={() => setIsAddNew(!isAddNew)}>
        <Icon id="PlusFolder" />
      </SideButtonNew>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SideButton = styled.button`
  height: 2rem;

  &:hover {
    color: red;
  }
`

const SideButtonNew = styled(SideButton)`
  color: var(--text-color);
  &:hover {
    color: lime;
  }
`

const NewSectionForm = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;
`

const NewSectionInput = styled.input`
  background: hsl(var(--black));
  ${H2_style}
`

const Button = styled.button`
  color: hsl(var(--white));
  height: 32px;

  &:hover {
    color: var(--primary);
  }
`
