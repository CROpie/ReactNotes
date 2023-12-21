import React from 'react'
import styled from 'styled-components'
import Icon from '../icons/Icon'
import DOMPurify from 'dompurify'

const imagePath = 'public/modalImages/'

// const images = [
//   'CategoryMenu0.svg',
//   'CategoryMenu1.svg',
//   'Sections0.svg',
//   'Sections1.svg',
//   'Items0.svg',
//   'Items1.svg',
//   'ContextMenu0.svg',
//   'ContextMenu1.svg',
// ]

import { images } from '../modalSVGs/modalSVGs'
import { ModalCtx } from '../../contexts/ModalCtx'

const headings = [
  'React Notes',
  'Category Menu',
  'Category Menu',
  'Sections',
  'Sections',
  'Items',
  'Special Elements',
  'Context Menu',
  'Context Menu',
]
const texts = [
  "This app was designed for storing information or interesting things in an organized, logical manner. It's primary function was to provide a platform for storing useful code and notes about various programming languages and associated libraries. For more detailed information about the usage and functions of the app, please click the arrows below.",
  'Open the category menu via the icon in the top-left corner.',
  'This menu is responsible for handling categories and articles (sub-categories).',
  'Clicking on an article retrieves the data of the article from the database in the form of sections and items.',
  'Sections are sub-sub-categories displayed in an accordion. They are populated with notes made up of html elements',
  'Selecting an element produces an input field where notes can be written. After saving to the database, they will take the form of the selected element.',
  "<Code> is a special element which colour-codes inputted text via the prismjs library. svg's can be created by pasting an svg as a string. Images are added as files.",
  'There are no restrictions to the number or order of elements. Elements can be shifted around and copy-pasted using the context menu. Deletion is only possible when toggled in the main menu.',
  'In fact, categories, articles and sections can all also use this context menu. Entire categories with associated data can be copied and pasted if desired.',
]

export default function IntroModal({ handleCloseModal }) {
  // const [modalIndex, setModalIndex] = React.useState(0)
  const { modalIndex, setModalIndex } = React.useContext(ModalCtx)

  function handleClickArrow(direction) {
    let tempIndex = modalIndex

    if (direction === 'next') tempIndex += 1
    if (direction === 'prev') tempIndex -= 1

    if (tempIndex === images.length) tempIndex = 0
    if (tempIndex === -1) tempIndex = images.length - 1

    setModalIndex(tempIndex)
  }

  function handleKeyDown(event) {
    if (event.key === 'ArrowRight') {
      handleClickArrow('next')
    }
    if (event.key === 'ArrowLeft') {
      handleClickArrow('prev')
    }
    if (event.key === 'Escape') {
      handleCloseModal()
    }
  }

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [modalIndex])

  return (
    <ModalBackground>
      <Modal>
        {/* <ModalHeadingH2>{`${modalIndex + 1}: ${headings[modalIndex]}`}</ModalHeadingH2> */}
        <ModalHeadingH2>{`${headings[modalIndex]}`}</ModalHeadingH2>
        <ModalText>{texts[modalIndex]}</ModalText>
        <ModalImageContainer>
          <div dangerouslySetInnerHTML={{ __html: images[modalIndex] }} />
          {/* <Image src={`${imagePath}${images[modalIndex]}`} /> */}
          {/* <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(images[modalIndex]) }} /> */}
          {/* <div dangerouslySetInnerHTML={{ __html: `${imagePath}${images[modalIndex]}` }} /> */}
        </ModalImageContainer>

        <ModalButtonsContainer>
          <Button onClick={() => handleClickArrow('prev')}>
            <Icon id="ArrowLeft" />
          </Button>

          <ModalCloseButton onClick={handleCloseModal}>Ok, Got it!</ModalCloseButton>

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
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.6);
  /* display: none; */
`

const Modal = styled.div`
  padding-block: 1rem;
  padding-inline: 2rem;
  border-radius: 4px;
  width: 700px;
  height: 500px;
  background: #f8f4fa;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr auto;
  /* grid-template-rows: auto auto auto 1fr auto; */
  gap: 8px;

  /* display: flex;
  flex-direction: column;
  justify-content: space-between; */
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
  text-align: justify;
  line-height: 1.25;
`

const ModalImageContainer = styled.div`
  display: grid;
  place-items: center;
`

const Image = styled.img``

const ModalButtonsContainer = styled.div`
  margin-top: 2rem;
  /* display: grid;
  grid-template-columns: auto auto auto; */
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > button {
    height: 48px;
    font-size: 2rem;

    cursor: pointer;
  }
`

const Button = styled.button`
  border-radius: 50%;

  & > div > svg {
    transition: color 0.25s ease-in;
  }

  & > div > svg:hover {
    color: green;
  }
`

const ImagePrevButton = styled.img``

const ImageNextButton = styled.img``

const ModalCloseButton = styled.button`
  font-size: 1.5rem;
  width: auto;

  border: 3px solid black;
  border-radius: 8px;

  padding-inline: 16px;
  transition: background-color 0.25s ease-in, color 0.25s ease-in;
  &:hover {
    background: #a507c5;
    color: white;
  }
`
