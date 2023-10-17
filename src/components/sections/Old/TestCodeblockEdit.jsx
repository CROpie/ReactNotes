import React from 'react'
import styled from 'styled-components'
import PrismCodeblock2 from '../components/sections/Template/PrismCodeblock2'
import ResizeTextArea from '../components/utils/ResizeTextArea'
const URL = 'http://127.0.0.1:8000/section/?article_id=1'

export default function Test() {
  const [code, setCode] = React.useState('')
  const [isEditing, setIsEditing] = React.useState(false)

  React.useEffect(() => {
    async function getCode() {
      const response = await fetch(URL)
      const json = await response.json()
      console.log(json)
      const gotCode = json[0].items[3].text
      console.log(gotCode)
      setCode(gotCode)
    }
    getCode()
  }, [])

  return (
    <div>
      <button onClick={() => setIsEditing(!isEditing)}>EDIT</button>
      {!isEditing && <PrismCodeblock2 codeBlock={code} />}
      {isEditing && <ResizeTextArea text={code} setText={setCode} />}
    </div>
  )
}
