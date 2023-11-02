import React from 'react'
import styled from 'styled-components'

import EditItem from './EditItem'
import PrismCodeblock from '../Inputs/PrismCodeblock'

import { H1_style, H2_style, H3_style, H4_style, P_style } from '../../styles/mixins'
import { EditContext } from '../../../contexts/EditCtx'

export default function Item({ item }) {
  const { element, text, id: item_id, image } = item

  const { isEdit } = React.useContext(EditContext)

  const renderElement = (element, text, item_id, image) => {
    switch (element) {
      case 'h1':
        return <H1>{text}</H1>
      case 'h2':
        return <H2>{text}</H2>
      case 'h3':
        return <H3>{text}</H3>
      case 'h4':
        return <H4>{text}</H4>
      case 'p':
        return <P>{text}</P>
      case 'ol':
        const orderedList = JSON.parse(text)
        return (
          <OrderedList>
            {orderedList.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </OrderedList>
        )

      case 'ul':
        const unorderedList = JSON.parse(text)
        return (
          <UnorderedList>
            {unorderedList.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </UnorderedList>
        )

      case 'a':
        return <A href={text}>{text}</A>
      case 'code':
        return (
          <CodeblockContainer>
            <PrismCodeblock codeBlock={text} />
          </CodeblockContainer>
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
    <ItemWrapper $editing={isEdit === `item-${item_id}` ? 'true' : undefined}>
      {isEdit !== `item-${item_id}` && (
        <SectionListItem> {renderElement(element, text, item_id, image)}</SectionListItem>
      )}
      {isEdit === `item-${item_id}` && <EditItem item={item} text={text} />}
    </ItemWrapper>
  )
}

const ItemWrapper = styled.div`
  border: ${(props) => (props.$editing ? '2px dashed red' : 'none')};
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

const H4 = styled.h4`
  ${H4_style}
`

const P = styled.p`
  ${P_style}
  white-space: pre-wrap;
  line-height: 1.5;
`
const A = styled.a`
  ${P_style}
  text-decoration: underline;
`

const CodeblockContainer = styled.div`
  /* display: none; */
  width: 100%;
`

const ImageContainer = styled.div`
  min-height: 50px;
  max-height: 500px;
  width: 100%;

  margin: 0 auto;
  border: 2px solid hsl(var(--purple));

  & > img {
    min-width: auto;
    max-width: 100%;
  }
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

const List = `
  ${P_style}
  list-style: revert;
  padding-left: 5rem;
  display: grid;
  gap: 8px;
`
const OrderedList = styled.ol`
  ${List}
  list-style-type: decimal;
`
const UnorderedList = styled.ul`
  ${List}
`
const ListItem = styled.li``
