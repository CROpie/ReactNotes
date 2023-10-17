import React from 'react'
import styled from 'styled-components'

import { useParams } from 'react-router-dom'

import { URL as url } from '../constants'

import Icon from '../components/icons/Icon'
import Section from '../components/sections/Template/Section'

import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'

function generateImageUrl(image) {
  const binaryImage = atob(image)
  const bytes = new Uint8Array(binaryImage.length)
  for (let i = 0; i < binaryImage.length; i++) {
    bytes[i] = binaryImage.charCodeAt(i)
  }
  const blob = new Blob([bytes], { type: 'image/jpeg' })
  const imageUrl = URL.createObjectURL(blob)
  return imageUrl
}

async function getSections(article_id) {
  console.log('getSections: ', article_id)
  console.log('Fetching sections...')
  const response = await fetch(`${url}/section?article_id=${article_id}`)
  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }
  const json = await response.json()
  json.forEach((section) => {
    section.items.forEach((item) => {
      if (item.image) {
        const imageUrl = generateImageUrl(item.image)
        item.image = imageUrl
      }
    })
  })

  // ensure sorted by section_position and item_position
  json.sort((a, b) => a.section_position - b.section_position)
  json.forEach((section) => {
    section.items.sort((a, b) => a.item_position - b.item_position)
  })
  return json
}

function sectionsQuery(article_id) {
  console.log('query: ', typeof article_id)
  return {
    queryKey: ['sections', article_id],
    queryFn: async () => getSections(article_id),
    staleTime: 1000 * 60 * 5,
  }
}

export const contentLoader =
  (queryClient) =>
  async ({ params }) => {
    console.log('inside content loader')
    const { article_id: articleID } = params
    const article_id = parseInt(articleID)

    const query = sectionsQuery(article_id)

    const data = queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))

    return data
  }

export default function Template() {
  console.log('template..')
  /* CAUTION: useParams() gives strings */
  const { article_id: articleID } = useParams()
  const article_id = parseInt(articleID)

  const queryClient = useQueryClient()
  const query = sectionsQuery(article_id)

  const { data: sections, status } = useQuery(query)

  // function generateImageUrl(image) {
  //   const binaryImage = atob(image)
  //   const bytes = new Uint8Array(binaryImage.length)
  //   for (let i = 0; i < binaryImage.length; i++) {
  //     bytes[i] = binaryImage.charCodeAt(i)
  //   }
  //   const blob = new Blob([bytes], { type: 'image/jpeg' })
  //   const imageUrl = URL.createObjectURL(blob)
  //   return imageUrl
  // }

  // async function getSections() {
  //   console.log('Fetching sections...')
  //   const response = await fetch(`${url}/section?article_id=${article_id}`)
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok.')
  //   }
  //   const json = await response.json()
  //   json.forEach((section) => {
  //     section.items.forEach((item) => {
  //       if (item.image) {
  //         const imageUrl = generateImageUrl(item.image)
  //         item.image = imageUrl
  //       }
  //     })
  //   })

  //   // ensure sorted by section_position and item_position
  //   json.sort((a, b) => a.section_position - b.section_position)
  //   json.forEach((section) => {
  //     section.items.sort((a, b) => a.item_position - b.item_position)
  //   })
  //   return json
  // }

  async function createNewSection() {
    console.log('new section ??')
    const response = await fetch(`${url}/section`, {
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
