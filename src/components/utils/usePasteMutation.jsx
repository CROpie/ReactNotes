import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { BaseURL } from '../../constants'

async function getClipboardData() {
  if (navigator.clipboard) {
    try {
      const clipboardText = await navigator.clipboard.readText()
      return JSON.parse(clipboardText)
    } catch (error) {
      console.log('Error reading clipboard data:', error)
    }
  } else {
    console.log('Clipboard API is not supported.')
  }
}

async function pasteContainer({ container, newPosition, parent_id, cutCopy }) {
  const jsonObject = await getClipboardData()

  let body = {}

  if (container === 'category') {
    body = {
      category_position: newPosition,
      id: jsonObject.id,
      articles: jsonObject.articles,
      category_name: jsonObject.category_name,
    }
  }

  if (container === 'article') {
    body = {
      article_position: newPosition,
      category_id: parent_id,
      id: jsonObject.id,
      sections: jsonObject.sections,
      article_name: jsonObject.article_name,
    }
  }

  if (container === 'section') {
    body = {
      section_position: newPosition,
      article_id: parent_id,
      id: jsonObject.id,
      items: jsonObject.items,
      title: jsonObject.title,
    }
  }

  if (container === 'item') {
    body = {
      id: jsonObject.id,
      item_position: newPosition,
      section_id: parent_id,
      element: jsonObject.element,
      text: jsonObject.text,
      image_id: null,
    }
  }
  console.log(body)
  const response = await fetch(`${BaseURL}/${container}paste/?cutcopy=${cutCopy}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }
  return response.json()
}

export const usePasteMutation = () => {
  const queryClient = useQueryClient()
  const { article_id: articleId } = useParams()
  const article_id = parseInt(articleId)

  return useMutation({
    mutationFn: async (container, newPosition, parent_id, cutCopy) =>
      pasteContainer(container, newPosition, parent_id, cutCopy),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sections', article_id] })
      /* this isn't working perfectly with cut.. switching categories requires a refresh to remove removed one)*/
      /* same with item - fine w same section but needs refresh for different article/category */
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (error) => {
      console.error('onError something went wrong...', error)
    },
  })
}
