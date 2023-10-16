import React from 'react'

export const SidebarContext = React.createContext()

export function SidebarCtxProvider({ children }) {
  const [openCategory, setOpenCategory] = React.useState(0)

  return (
    <SidebarContext.Provider value={{ openCategory, setOpenCategory }}>
      {children}
    </SidebarContext.Provider>
  )
}
