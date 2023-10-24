import React from 'react'
import styled from 'styled-components'

import Icon from '../../icons/Icon'

const options = [
  'select element: ',
  'h1',
  'h2',
  'h3',
  'h4',
  'p',
  'code',
  'ol',
  'ul',
  'a',
  'img',
  'svg',
]

export default function ElementSelect({ newElementTag, setNewElementTag }) {
  return (
    <Wrapper>
      <NativeSelect value={newElementTag} onChange={(e) => setNewElementTag(e.target.value)}>
        {options.map((element, index) => (
          <option key={index} value={element}>
            {element}
          </option>
        ))}
      </NativeSelect>

      <PresentationBit>
        {newElementTag ? newElementTag : 'Select Element:'}
        <IconWrapper>
          <Icon id="ChevronDown" />
        </IconWrapper>
      </PresentationBit>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 14rem;
  border: 2px solid hsl(var(--white));
  &:hover {
    border: 2px solid hsl(var(--green));
    color: hsl(var(--green));
  }
`

const NativeSelect = styled.select`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
`

const IconWrapper = styled.div`
  position: absolute;
  height: 1.5rem;
  top: 0;
  bottom: 0;
  right: 10px;
  margin: auto;
  pointer-events: none;
`

const PresentationBit = styled.div`
  padding: 12px 16px;
  padding-right: 52px;
  background: hsl(var(--code-bg) / 0.75);

  ${NativeSelect}:focus + & {
    /* outline: 1px dotted #212121; */
    /* outline: 5px auto -webkit-focus-ring-color; */
  }

  ${NativeSelect}:hover + & {
  }
`
