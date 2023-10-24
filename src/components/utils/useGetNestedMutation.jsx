import { useMutation } from '@tanstack/react-query'
import { BaseURL } from '../../constants'
import { copyToClipboard } from './copyToClipboard'

/* 

The regular get functions for this app get categories-articles and sections-items
Clicking on an article will retrieve from the server the relevant sections-items
This function is a way to get the complete nested structure, for cut/copy/paste or backing up as an object

*/

export async function getNested({ container, id }) {
  const response = await fetch(`${BaseURL}/${container}/?${container}_id=${id}`)
  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }
  return { response: await response.json() }
}

export const useGetNestedMutation = () => {
  return useMutation({
    mutationFn: async (container, id) => getNested(container, id),
    onSuccess: ({ response }) => {
      copyToClipboard(response)
    },
    onError: (error) => {
      console.error('onError something went wrong...', error)
    },
  })
}
