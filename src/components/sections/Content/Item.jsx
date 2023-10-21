import React from 'react'
import styled from 'styled-components'

import EditItem from './EditItem'
import ItemButtonGroup from './ItemButtonGroup'
import PrismCodeblock from './PrismCodeblock'

import { H1_style, H2_style, H3_style, P_style } from '../../styles/mixins'

export default function Item({ item, index, shiftPosition }) {
  const { element, text, id: item_id, image } = item

  const [isEditing, setIsEditing] = React.useState(0)
  const [editingText, setEditingText] = React.useState('')

  const renderElement = (element, text, item_id, image) => {
    switch (element) {
      case 'h1':
        return (
          <H1
            onDoubleClick={() => {
              setIsEditing(item_id)
              setEditingText(text)
            }}
          >
            {text}
          </H1>
        )
      case 'h2':
        return (
          <H2
            onDoubleClick={() => {
              setIsEditing(item_id)
              setEditingText(text)
            }}
          >
            {text}
          </H2>
        )
      case 'h3':
        return (
          <H3
            onDoubleClick={() => {
              setIsEditing(item_id)
              setEditingText(text)
            }}
          >
            {text}
          </H3>
        )
      case 'p':
        return (
          <P
            onDoubleClick={() => {
              setIsEditing(item_id)
              setEditingText(text)
            }}
          >
            {text}
          </P>
        )
      case 'a':
        return (
          <A
            href={text}
            on
            onDoubleClick={() => {
              setIsEditing(item_id)
              setEditingText(text)
            }}
          >
            {text}
          </A>
        )
      case 'code':
        return (
          <div
            onDoubleClick={() => {
              setIsEditing(item_id)
              setEditingText(text)
            }}
          >
            <PrismCodeblock codeBlock={text} />
          </div>
        )
      case 'img':
        return (
          <ImageContainer>
            <Image src={image} alt="" height="100%" />
          </ImageContainer>
        )
      case 'svg':
        return <SVGContainer dangerouslySetInnerHTML={{ __html: text }} />
      default:
        return <div>{text}</div>
    }
  }

  return (
    <ItemWrapper>
      <ItemButtonGroup item_id={item_id} index={index} shiftPosition={shiftPosition} />
      {isEditing !== item_id && (
        <SectionListItem> {renderElement(element, text, item_id, image)}</SectionListItem>
      )}
      {isEditing === item_id && (
        <EditItem
          item={item}
          editingText={editingText}
          setEditingText={setEditingText}
          setIsEditing={setIsEditing}
        />
      )}
    </ItemWrapper>
  )
}

const ItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 4rem 1fr;
`

const SectionListItem = styled.li`
  align-self: center;
`

const H1 = styled.h1`
  ${H1_style}
`

const H2 = styled.h2`
  ${H2_style}
`

const H3 = styled.h3`
  ${H3_style}
`

const P = styled.pre`
  font-size: 1.25rem;
  ${P_style}
  line-height: 1;
`
const A = styled.a`
  font-size: 1.25rem;
  ${P_style}
  text-decoration: underline;
`

const ImageContainer = styled.div`
  height: 500px;
  margin: 0 auto;
  border: 2px solid lime;
`

const Image = styled.img`
  margin: 0 auto;
`

const SVGContainer = styled.div`
  display: grid;
  place-items: center;
  & > svg {
    max-width: 100%;
    max-height: 1000px;
    width: auto;
    height: auto;
  }
`
