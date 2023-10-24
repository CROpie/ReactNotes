import React from 'react'
import styled from 'styled-components'

import { EditContext } from '../../../contexts/EditCtx'
import { useEditMutation } from '../../utils/useEditMutation'

import Icon from '../../icons/Icon'

export default function EditArticle({ article_id, article_name }) {
  const [editArticleName, setEditArticleName] = React.useState(article_name)

  const { setIsEdit } = React.useContext(EditContext)

  const { mutate: editMutate } = useEditMutation()

  const editRef = React.useRef()

  async function handleSubmit() {
    editMutate(
      {
        container: 'article',
        body: { id: article_id, text: editArticleName },
      },
      {
        onSuccess: () => {
          setIsEdit(``)
          //   setIsPostError(false)
        },
        // onError: () => setIsPostError(true),
      }
    )
  }

  React.useEffect(() => {
    editRef.current.focus()
    editRef.current.select()
    // document.execCommand('selectAll')
  }, [])

  return (
    <ArticleEditDiv>
      <ArticleEditInput
        value={editArticleName}
        onChange={(e) => setEditArticleName(e.target.value)}
        ref={editRef}
      />
      <EditButtonsWrapper>
        <EditSaveWrapper onClick={handleSubmit}>
          <Icon id="Save" />
        </EditSaveWrapper>
        <EditCancelWrapper
          onClick={() => {
            setIsEdit(``)
            setEditArticleName(article_name)
          }}
        >
          <Icon id="X" />
        </EditCancelWrapper>
      </EditButtonsWrapper>
    </ArticleEditDiv>
  )
}

const ArticleEditDiv = styled.div`
  padding: 4px 16px;

  border: 2px dashed hsl(var(--red));
  color: hsl(var(--black));
  background: var(--primary-hover);
`

const ArticleEditInput = styled.input`
  width: 100%;
  text-align: start;

  font-size: 1.125rem;
  font-weight: 500;

  border: none;
  outline: none;
  color: hsl(var(--black));
  background: transparent;
`

const EditButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-content: center;
  margin: 0 auto;

  margin-top: 1rem;
`

const EditSaveWrapper = styled.button`
  height: 1.5rem;
  color: hsl(var(--black));

  &:hover {
    color: lime;
  }
`

const EditCancelWrapper = styled.button`
  height: 1.5rem;
  color: hsl(var(--black));
  &:hover {
    color: red;
  }
`
