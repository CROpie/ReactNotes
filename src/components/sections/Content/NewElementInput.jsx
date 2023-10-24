import React from 'react'
import styled from 'styled-components'

import { H1_style, H2_style, H3_style, H4_style, P_style } from '../../styles/mixins'

import Icon from '../../icons/Icon'

import { usePostMutation } from '../../utils/usePostMutation'

import ResizeTextArea from '../../utils/ResizeTextArea'
import ResizeTextAreaP from '../../utils/ResizeTextAreaP'
import ListInput from '../Inputs/ListInput'

export default function NewElementInput({ new_item_position, section_id, newElementTag }) {
  const [text, setText] = React.useState('')

  const [selectedImage, setSelectedImage] = React.useState(null)
  const [isPostError, setIsPostError] = React.useState(false)

  const { mutate: postMutate } = usePostMutation()

  async function handleClick() {
    let image_id = null
    if (selectedImage) {
      image_id = await postImage()
    }

    postMutate(
      {
        container: 'item',
        body: {
          item_position: new_item_position,
          section_id,
          element: newElementTag,
          text,
          image_id,
        },
      },
      {
        onSuccess: () => {
          setText('')
          setIsPostError(false)
        },
        onError: () => setIsPostError(true),
      }
    )
  }

  return (
    <Wrapper $isError={isPostError}>
      {newElementTag === 'h1' && (
        <H1Input placeholder="H1-HEADING" value={text} onChange={(e) => setText(e.target.value)} />
      )}
      {newElementTag === 'h2' && (
        <H2Input placeholder="H2-HEADING" value={text} onChange={(e) => setText(e.target.value)} />
      )}
      {newElementTag === 'h3' && (
        <H3Input placeholder="H3-HEADING" value={text} onChange={(e) => setText(e.target.value)} />
      )}
      {newElementTag === 'h4' && (
        <H4Input placeholder="H4-HEADING" value={text} onChange={(e) => setText(e.target.value)} />
      )}
      {newElementTag === 'p' && (
        <ResizeTextAreaP placeholder="TEXT" text={text} setText={setText} />
      )}
      {(newElementTag === 'ol' || newElementTag === 'ul') && (
        <ListInput tag={newElementTag} text={text} setText={setText} />
      )}
      {newElementTag === 'code' && (
        <ResizeTextArea placeholder="TEXT" text={text} setText={setText} />
      )}
      {newElementTag === 'img' && (
        <input type="file" text="alttext" onChange={(e) => setSelectedImage(e.target.files[0])} />
      )}
      {newElementTag === 'a' && (
        <AInput placeholder="URL" value={text} onChange={(e) => setText(e.target.value)} />
      )}
      {newElementTag === 'svg' && (
        <AInput
          placeholder="Paste raw SVG data here"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      )}
      {newElementTag && (
        <SideButtonWrapper>
          <SideButton onClick={() => handleClick()} disabled={text === ''}>
            <Icon id="Save" />
          </SideButton>
        </SideButtonWrapper>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  gap: 8px;

  & > input,
  & > div > textarea,
  & > textarea {
    border: ${(props) => (props.$isError ? '2px solid red' : '2px solid white')};
  }
`

const H1Input = styled.input`
  ${H1_style};
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

const H4Input = styled.input`
  ${H4_style}
  background: transparent;
`

const AInput = styled.input`
  ${P_style}
  background: transparent;
  color: hsl(var(--white));
`

const PInput = styled.textarea`
  ${P_style}
  background: transparent;
  color: hsl(var(--white));
`

const SideButtonWrapper = styled.div``

const SideButton = styled.button`
  height: 2rem;
  color: var(--text-color);
  margin: 0 auto;
  &:hover {
    color: lime;
  }
  &:disabled {
    color: grey;
  }
`
