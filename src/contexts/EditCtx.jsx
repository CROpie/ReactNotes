import React from 'react'

export const EditContext = React.createContext()

export function EditCtxProvider({ children }) {
  const [isEdit, setIsEdit] = React.useState(``)

  return (
    <EditContext.Provider
      value={{
        isEdit,
        setIsEdit,
      }}
    >
      {children}
    </EditContext.Provider>
  )
}
