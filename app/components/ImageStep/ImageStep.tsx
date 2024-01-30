'use clinet'

import React, { useState } from 'react'
import { title } from 'process'
import { contentContainer } from '../styles.css'
import {
  arrowButton,
  buttonSet,
  contentHeader,
  imageList,
  mainImageContainer,
  selectButton,
  skipButton,
} from './styles.css'

import ArrowRight from '@/public/icon/arrow-right-w.svg'
import ArrowFatLinesRight from '@/public/icon/arrow-fat-lines-right.svg'

import CaretCircleLeft from '@/public/icon/caret-circle-left-secondary-l.svg'
import CaretCircleRight from '@/public/icon/caret-circle-right-secondary-l.svg'
import Image from 'next/image'

const imageArr = [
  'cyber-tiger',
  'gitl-castle',
  'japan-anime',
  'dark-space',
  'dark-city',
  'martipoo',
] as const

export type ImageType = (typeof imageArr)[number]

export type ImageStepProps = {
  onNextStep: (selectedImage: ImageType) => void
}

export const ImageStep = ({ onNextStep }: ImageStepProps) => {
  const [selectedImage, setSelectedImage] = useState<ImageType>('cyber-tiger')

  const currentIndex = imageArr.findIndex(image => selectedImage === image)

  return (
    <div className={contentContainer}>
      <div className={contentHeader}>
        <h2 className={title}>마음에 드는 이미지를 선택해 주세요</h2>

        <div className={buttonSet}>
          {/* <button className={skipButton}>
            넘어가기
            <ArrowFatLinesRight />
          </button> */}
          <button
            className={selectButton}
            onClick={() => onNextStep(selectedImage)}
          >
            이 이미지 선택
            <ArrowRight />
          </button>
        </div>
      </div>

      <div className={mainImageContainer}>
        <button
          className={arrowButton}
          onClick={() => {
            if (currentIndex === 0) {
              setSelectedImage(imageArr[imageArr.length - 1])
            } else {
              setSelectedImage(imageArr[currentIndex - 1])
            }
          }}
        >
          <CaretCircleLeft />
        </button>
        <Image
          src={`/images/${selectedImage}.png`}
          alt={selectedImage}
          width={640}
          height={360}
        />
        <button
          className={arrowButton}
          onClick={() => {
            if (currentIndex === imageArr.length - 1) {
              setSelectedImage(imageArr[0])
            } else {
              setSelectedImage(imageArr[currentIndex + 1])
            }
          }}
        >
          <CaretCircleRight />
        </button>
      </div>

      <div className={imageList}>
        {imageArr
          .filter(image => image !== selectedImage)
          .map(image => (
            <Image
              key={image}
              src={`/images/${image}.png`}
              alt={image}
              width={240}
              height={135}
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedImage(image)}
            />
          ))}
      </div>
    </div>
  )
}
