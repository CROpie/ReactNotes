import React from 'react'

export const SidebarContext = React.createContext()

export function SidebarCtxProvider({ children }) {
  const [openCategory, setOpenCategory] = React.useState(0)
  const [selectedArticle, setSelectedArticle] = React.useState('')
  const [isAllowedDelete, setIsAllowedDelete] = React.useState(false)

  return (
    <SidebarContext.Provider
      value={{
        openCategory,
        setOpenCategory,
        selectedArticle,
        setSelectedArticle,
        isAllowedDelete,
        setIsAllowedDelete,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}
