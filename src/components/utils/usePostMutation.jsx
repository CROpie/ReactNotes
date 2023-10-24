import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { BaseURL } from '../../constants'

async function postCategory({ container, body }) {
  console.log(container, body)
  const response = await fetch(`${BaseURL}/${container}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }
  return { response: response.json(), container }
}

export const usePostMutation = () => {
  const queryClient = useQueryClient()
  const { article_id: articleId } = useParams()
  const article_id = parseInt(articleId)

  return useMutation({
    mutationFn: async (container, body) => postCategory(container, body),
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

/*
  async function postCategory() {
    const response = await fetch(`${BaseURL}/category`, {
      method: 'POST',
      body: JSON.stringify({ category_name: categoryName, category_position }),
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }
    return response.json()
  }

  const mutation = useMutation({
    mutationFn: async () => postCategory(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      setIsNewCategory(false)
    },
    onError: (error) => {
      console.error('onError something went wrong...', error)
    },
  })
  */
