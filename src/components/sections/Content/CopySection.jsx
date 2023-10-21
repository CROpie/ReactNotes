import React from 'react'
import styled from 'styled-components'

import Icon from '../../icons/Icon'

export default function CopySection({ section }) {
  async function copySectionToClipboard() {
    const sectionString = JSON.stringify(section)
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(sectionString)
        // toast.success('Section Copied.')
        console.log('copied')
      } catch (error) {
        console.log('error')
      }
    } else {
      console.log('error')
    }
  }

  return (
    <Wrapper>
      <SectionCopy onClick={copySectionToClipboard}>
        <Icon id="Copy" />
      </SectionCopy>
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

const SectionCopy = styled.button`
  color: hsl(var(--white));
  height: 32px;

  &:hover {
    color: hsl(var(--green));
  }
`
