import styled from 'styled-components'

import Save from './Save'
import Trash from './Trash'
import X from './X'
import PlusFolder from './PlusFolder'
import PlusPage from './PlusPage'
import UpArrow from './UpArrow'
import DownArrow from './DownArrow'
const icons = {
  Save,
  Trash,
  X,
  PlusFolder,
  PlusPage,
  UpArrow,
  DownArrow,
}

const Icon = ({ id, height, color, size, strokeWidth, ...delegated }) => {
  const Component = icons[id]

  if (!Component) {
    throw new Error(`No icon found for ID: ${id}`)
  }

  return (
    <Wrapper height={height} strokeWidth={strokeWidth} {...delegated}>
      <Component color={color} size={size} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: ${(p) => (p.height ? p.height : '100%')};

  & > svg {
    display: block;
    stroke-width: ${(p) => (p.strokeWidth !== undefined ? p.strokeWidth + 'px' : undefined)};
  }
`

export default Icon
