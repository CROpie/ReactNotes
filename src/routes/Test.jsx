import React from 'react'
import PrismCodeblock from '../components/sections/Template/PrismCodeblock'

export default function Test() {
  const [code, setCode] = React.useState('')
  console.log(code)

  return (
    <div>
      <textarea onChange={(e) => setCode(e.target.value)} />
      <PrismCodeblock codeBlock={code} />
    </div>
  )
}
