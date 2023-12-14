import styled from 'styled-components'

import Save from './Save'
import Trash from './Trash'
import X from './X'
import PlusFolder from './PlusFolder'
import PlusPage from './PlusPage'
import UpArrow from './UpArrow'
import DownArrow from './DownArrow'
import MinusPage from './MinusPage'
import Paste from './Paste'
import Copy from './Copy'
import MinusFolder from './MinusFolder'
import ChevronUp from './ChevronUp'
import ChevronDown from './ChevronDown'
import Edit from './Edit'
import Cut from './Cut'
import ArrowLeft from './ArrowLeft'
import ArrowRight from './ArrowRight'

const icons = {
  Save,
  Trash,
  X,
  PlusFolder,
  PlusPage,
  UpArrow,
  DownArrow,
  MinusPage,
  Paste,
  Copy,
  MinusFolder,
  ChevronUp,
  ChevronDown,
  Edit,
  Cut,
  ArrowLeft,
  ArrowRight,
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
