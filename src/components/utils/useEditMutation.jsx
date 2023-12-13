import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { BaseURL } from '../../constants'

async function editCategory({ container, body }) {
  console.log('editing:', container, body)
  const response = await fetch(`${BaseURL}/${container}text/`, {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }
  return { response: response.json(), container }
}

export const useEditMutation = () => {
  const queryClient = useQueryClient()
  const { article_id: articleId } = useParams()
  const article_id = parseInt(articleId)

  return useMutation({
    mutationFn: async (container, body) => editCategory(container, body),
    onSuccess: ({ container }) => {
      if (container === 'item' || container === 'section') {
        queryClient.invalidateQueries({ queryKey: ['sections', article_id] })
      } else if (container === 'article' || container === 'category') {
        queryClient.invalidateQueries({ queryKey: ['categories'] })
      }
      console.log('hello')
    },
    onError: (error) => {
      console.error('onError something went wrong...', error)
    },
  })
}
