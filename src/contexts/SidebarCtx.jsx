import React from 'react'

export const SidebarContext = React.createContext()

export function SidebarCtxProvider({ children }) {
  const [openCategory, setOpenCategory] = React.useState(0)
  const [selectedArticle, setSelectedArticle] = React.useState('')

  return (
    <SidebarContext.Provider
      value={{ openCategory, setOpenCategory, selectedArticle, setSelectedArticle }}
    >
      {children}
    </SidebarContext.Provider>
  )
}
