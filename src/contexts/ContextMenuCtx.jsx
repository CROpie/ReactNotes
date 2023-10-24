import React from 'react'

export const ContextMenuContext = React.createContext()

export function ContextMenuCtxProvider({ children }) {
  const [clicked, setClicked] = React.useState(false)
  const [points, setPoints] = React.useState({ x: 0, y: 0 })
  // "cut" | "copy"
  const [cutCopy, setCutCopy] = React.useState('copy')

  return (
    <ContextMenuContext.Provider
      value={{ clicked, setClicked, points, setPoints, cutCopy, setCutCopy }}
    >
      {children}
    </ContextMenuContext.Provider>
  )
}
