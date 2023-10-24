import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { BaseURL } from '../../constants'

export async function deleteEntry({ container, id }) {
  const response = await fetch(`${BaseURL}/${container}/?${container}_id=${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }
  return { response: response.json(), container }
}

export const useDeleteMutation = () => {
  const queryClient = useQueryClient()
  const { article_id: articleId } = useParams()
  const article_id = parseInt(articleId)

  return useMutation({
    mutationFn: async (container, id) => deleteEntry(container, id),
    onSuccess: ({ container }) => {
      if (container === 'item' || container === 'section') {
        queryClient.invalidateQueries({ queryKey: ['sections', article_id] })
      } else if (container === 'article' || container === 'category') {
        queryClient.invalidateQueries({ queryKey: ['categories'] })
      }
    },
    onError: (error) => {
      console.error('onError something went wrong...', error)
    },
  })
}
