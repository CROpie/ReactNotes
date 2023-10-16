import React from 'react'
import styled from 'styled-components'

import { useParams } from 'react-router-dom'

import { URL } from '../constants'

import Icon from '../components/icons/Icon'
import Section from '../components/sections/Template/Section'

import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'

export default function Template() {
  /* CAUTION: useParams() gives strings */
  const { article_id: articleID } = useParams()
  const article_id = parseInt(articleID)

  const queryClient = useQueryClient()

  const { data: sections, status } = useQuery({
    queryKey: ['sections', article_id],
    queryFn: getSections,
    staleTime: 1000 * 60 * 5,
  })

  async function getSections() {
    console.log('Fetching sections...')
    const response = await fetch(`${URL}/section?article_id=${article_id}`)
    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }
    const json = await response.json()

    // ensure sorted by section_position and item_position
    json.sort((a, b) => a.section_position - b.section_position)
    json.forEach((section) => {
      section.items.sort((a, b) => a.item_position - b.item_position)
    })
    return json
  }

  async function createNewSection() {
    console.log('new section ??')
    const response = await fetch(`${URL}/section`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section_position: sections.length, article_id }),
    })
    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }
    return response.json()
  }

  const mutation = useMutation({
    mutationFn: async () => createNewSection(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sections', article_id] })
    },
    onError: (error) => {
      console.error('onError something went wrong...', error)
    },
  })

  return (
    <Wrapper>
      {status === 'idle' && <p>...</p>}
      {status === 'loading' && <p>Loading...</p>}
      {status === 'error' && <p>Something went wrong...</p>}
      {status === 'success' && (
        <>
          <ul>
            {sections.map((section) => (
              <Section section={section} key={section.id} />
            ))}
          </ul>
          <SideButtonWrapper>
            <SideButtonNew onClick={() => mutation.mutate()}>
              <Icon id="PlusFolder" />
            </SideButtonNew>
          </SideButtonWrapper>
        </>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin: 0 auto;
  max-width: 1200px;
`

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

const SideButtonNew = styled(SideButton)`
  &:hover {
    color: lime;
  }
`
