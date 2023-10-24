import React from 'react'
import styled from 'styled-components'

import { usePostMutation } from '../../utils/usePostMutation'
import Icon from '../../icons/Icon'

export default function NewArticle({ categoryId, article_position, setIsNewArticle }) {
  const [articleName, setArticleName] = React.useState('')
  const [isPostError, setIsPostError] = React.useState(false)

  const articleInput = React.useRef()

  React.useEffect(() => {
    articleInput.current.focus()
  }, [])

  const { mutate: postMutate } = usePostMutation()

  async function handleSubmit(e) {
    e.preventDefault()
    postMutate(
      {
        container: 'article',
        body: { article_name: articleName, article_position, category_id: categoryId },
      },
      {
        onSuccess: () => {
          setIsNewArticle(false)
          setIsPostError(false)
        },
        onError: () => setIsPostError(true),
      }
    )
  }

  return (
    <NewArticleForm onSubmit={(e) => handleSubmit(e)} $isError={isPostError}>
      <NewArticleInput
        type="text"
        placeholder="Basics"
        value={articleName}
        onChange={(e) => setArticleName(e.target.value)}
        ref={articleInput}
      />
      <IconWrapper type="submit">
        <Icon id="Save" />
      </IconWrapper>
    </NewArticleForm>
  )
}

const NewArticleForm = styled.form`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 2px solid hsl(var(--primary-hover));
  color: hsl(var(--black));
  background: ${(props) => (props.$isError ? 'red' : 'var(--primary-hover)')};

  font-size: 1.125rem;
  font-weight: 500;

  padding: 4px 16px;
`

const NewArticleInput = styled.input`
  font: inherit;
  border: none;
  background: transparent;
  outline: none;
`

const IconWrapper = styled.button`
  height: 1.125rem;

  &:hover {
    color: var(--highlight);
  }
`
