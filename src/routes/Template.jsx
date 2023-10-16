import React from 'react'
import styled from 'styled-components'

import { useParams } from 'react-router-dom'

import { URL } from '../constants'

import Icon from '../components/icons/Icon'
import Section from '../components/sections/Template/Section'

export default function Template() {
  const [sections, setSections] = React.useState([])

  const { article_id } = useParams()

  // 'idle' | 'loading' | 'success' | 'error
  const [status, setStatus] = React.useState('idle')

  React.useEffect(() => {
    async function getSections() {
      setStatus('loading')
      const response = await fetch(`${URL}/section?article_id=${article_id}`)
      if (!response.ok) {
        console.log('Something went wrong...')
        setStatus('error')
        return
      }
      const json = await response.json()

      // ensure sorted by section_position and item_position
      json.sort((a, b) => a.section_position - b.section_position)
      json.forEach((section) => {
        section.items.sort((a, b) => a.item_position - b.item_position)
      })
      setSections(json)
      setStatus('success')
    }

    getSections()
  }, [article_id])

  async function createNewSection() {
    const response = await fetch(`${URL}/section`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section_position: sections.length, article_id }),
    })
    if (!response.ok) {
      console.log('something went wrong..')
      return
    }
    const json = await response.json()
    console.log(json)
  }

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
            <SideButtonNew onClick={createNewSection}>
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
