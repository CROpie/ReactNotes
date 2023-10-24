export async function copyToClipboard(data) {
  const dataString = JSON.stringify(data)
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(dataString)
      // toast.success('Section Copied.')
      console.log('copied')
    } catch (error) {
      console.log('error')
    }
  } else {
    console.log('error')
  }
}
