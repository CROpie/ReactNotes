import React from 'react'
import styled from 'styled-components'
import Icon from '../components/icons/Icon'

const imagePath = 'public/modalImages/'

const images = ['Test0.svg', 'Test1.svg']
const headings = ['Rectangles', 'Colours']
const texts = ['here are some rectanges', 'here are some colours']

export default function Test() {
  const [modalIndex, setModalIndex] = React.useState(0)

  function handleClickArrow(direction) {
    let tempIndex = modalIndex

    if (direction === 'next') tempIndex += 1
    if (direction === 'prev') tempIndex -= 1

    if (tempIndex === images.length) tempIndex = 0
    if (tempIndex === -1) tempIndex = images.length - 1

    setModalIndex(tempIndex)
  }

  return (
    <ModalBackground>
      <Modal>
        <ModalHeadingH1>Information about ReactNotes</ModalHeadingH1>
        <ModalHeadingH2>{headings[modalIndex]}</ModalHeadingH2>
        <ModalText>{texts[modalIndex]}</ModalText>
        <ModalImageContainer>
          <Image src={`${imagePath}${images[modalIndex]}`} />
        </ModalImageContainer>
        <ModalButtonsContainer>
          <Button onClick={() => handleClickArrow('prev')}>
            <Icon id="ArrowLeft" />
          </Button>
          <ModalCloseButton>Ok, Got it!</ModalCloseButton>
          <Button onClick={() => handleClickArrow('next')}>
            <Icon id="ArrowRight" />
          </Button>
        </ModalButtonsContainer>
      </Modal>
    </ModalBackground>
  )
}

const ModalBackground = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.4);
  /* display: none; */
`

const Modal = styled.div`
  padding-block: 1rem;
  padding-inline: 2rem;
  border-radius: 4px;
  width: auto;
  height: 450px;
  background: #f8f4fa;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: black;

  border-radius: 16px;
  box-shadow: -2px 5px 5px #a507c5;
`

const ModalHeadingH1 = styled.h1`
  text-align: center;
  font-size: 2rem;
`

const ModalHeadingH2 = styled.h2`
  text-align: center;
  font-size: 1.5rem;
`

const ModalText = styled.p`
  text-align: center;
`

const ModalImageContainer = styled.div`
  display: grid;
  place-items: center;
`

const Image = styled.img``

const ModalButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 5rem;

  & > button {
    font-size: 2rem;
    outline: none;
    border: none;
    background: transparent;
    cursor: pointer;
  }
`

const Button = styled.button`
  border-radius: 50%;

  & > div > svg:hover {
    color: green;
  }
`

const ImagePrevButton = styled.img``

const ImageNextButton = styled.img``

const ModalCloseButton = styled.button`
  width: 100%;
  border: 2px solid black;
  border-radius: 12px;
  padding: 4px 8px;

  &:hover {
    color: green;
  }
`
