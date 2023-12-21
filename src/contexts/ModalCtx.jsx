import React from 'react'

export const ModalCtx = React.createContext()

export function ModalCtxProvider({ children }) {
  const [modalIndex, setModalIndex] = React.useState(0)

  return <ModalCtx.Provider value={{ modalIndex, setModalIndex }}>{children}</ModalCtx.Provider>
}
