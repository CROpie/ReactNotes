import React from 'react'
import styled from 'styled-components'
import Icon from '../../icons/Icon'

import { useParams } from 'react-router-dom'

import { H2_style } from '../../styles/mixins'

import { usePostMutation } from '../../utils/usePostMutation'

export default function NewSection({ section_position }) {
  const { article_id: articleID } = useParams()
  const article_id = parseInt(articleID)

  const { mutate: postMutate } = usePostMutation()

  const [title, setTitle] = React.useState('')
  const [isAddNew, setIsAddNew] = React.useState(false)
  const [isPostError, setIsPostError] = React.useState(false)

  const newRef = React.useRef()

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title) return
    postMutate(
      {
        container: 'section',
        body: { section_position, article_id, title },
      },
      {
        onSuccess: () => {
          setIsAddNew(false)
          setIsPostError(false)
        },
        onError: () => setIsPostError(true),
      }
    )
  }

  React.useEffect(() => {
    isAddNew && newRef.current.focus()
  }, [isAddNew])

  return (
    <Wrapper>
      {isAddNew && (
        <NewSectionForm onSubmit={(e) => handleSubmit(e)}>
          <Blank />
          <NewSectionInput
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            $isError={isPostError}
            ref={newRef}
          />
          <Button type="submit">
            <Icon id="Save" />
          </Button>
        </NewSectionForm>
      )}
      <SideButtonNew
        onClick={() => {
          setIsAddNew(!isAddNew)
          setTitle('')
        }}
      >
        <Icon id={isAddNew ? 'MinusFolder' : 'PlusFolder'} />
      </SideButtonNew>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding-block: 16px;

  background: hsl(var(--code-bg) / 0.25);
`

const SideButtonNew = styled.button`
  color: var(--text-color);
  height: 2rem;
  &:hover {
    color: lime;
  }
`

const NewSectionForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`

const Blank = styled.div`
  height: 2rem;
  width: 2rem;
`

const NewSectionInput = styled.input`
  /* background: hsl(var(--black)); */
  ${H2_style}
  background: ${(props) => (props.$isError ? 'red' : 'hsl(var(--black))')};
  outline: none;
  border: none;
`

const Button = styled.button`
  color: hsl(var(--white));
  height: 2rem;

  &:hover {
    color: var(--primary);
  }
`
