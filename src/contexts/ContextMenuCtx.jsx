import React from 'react'

export const ContextMenuContext = React.createContext()

export function ContextMenuCtxProvider({ children }) {
  const [clicked, setClicked] = React.useState(false)
  const [points, setPoints] = React.useState({ x: 0, y: 0 })

  return (
    <ContextMenuContext.Provider value={{ clicked, setClicked, points, setPoints }}>
      {children}
    </ContextMenuContext.Provider>
  )
}
