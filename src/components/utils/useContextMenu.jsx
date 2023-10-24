import React from 'react'

import { ContextMenuContext } from '../../contexts/ContextMenuCtx'

export default function useContextMenu() {
  const { clicked, setClicked, points, setPoints } = React.useContext(ContextMenuContext)
  const componentId = React.useId()

  React.useEffect(() => {
    const handleClick = () => setClicked(false)
    window.addEventListener('click', handleClick)
    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [])
  return { clicked, setClicked, points, setPoints, componentId }
}
