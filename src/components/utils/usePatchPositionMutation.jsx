import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { BaseURL } from '../../constants'

async function patchPosition({ container, id, swap_id }) {
  if (!swap_id) {
    // throw new Error seems a bit forceful for wanting nothing to happen...
    return false
  }

  const response = await fetch(
    `${BaseURL}/${container}position/?${container}_1_id=${id}&${container}_2_id=${swap_id}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    }
  )
  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }
  return { response: response.json(), container }
}

export const usePatchPositionMutation = () => {
  const queryClient = useQueryClient()
  const { article_id: articleId } = useParams()
  const article_id = parseInt(articleId)

  return useMutation({
    mutationFn: async (container, id, swap_id) => patchPosition(container, id, swap_id),
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
