'use client'

import React, { useState } from 'react'
import {
  audio,
  genre,
  imageCover,
  imageDimmer,
  musicContainer,
  musicDescription,
  musicList,
  nowPlaying,
  nowPlayingGenreText,
  nowPlayingMusicContent,
  nowPlayingMusicInfo,
  nowPlayingMusicText,
  nowPlayingMusicTextContainer,
  nowPlayingText,
  playingImageCover,
  selectButton,
  selectButtonText,
  title,
} from './styles.css'
import Image from 'next/image'

import ArrowRight from '@/public/icon/arrow-right.svg'
import Play from '@/public/icon/play.svg'
import Pause from '@/public/icon/pause.svg'
import { contentContainer } from '../styles.css'

export type GenreType = 'k-pop' | 'edm' | 'classic'

type MusicStepProps = {
  onNextStep: (selectedGenre: GenreType) => void
}

export const MusicStep = ({ onNextStep }: MusicStepProps) => {
  const [playing, setPlaying] = useState<GenreType | undefined>(undefined)

  const handleMusicPlaying = (genre: GenreType) => {
    if (playing === genre) {
      setPlaying(undefined)
    } else {
      setPlaying(genre)
    }
  }

  return (
    <div className={contentContainer}>
      <h2 className={title}>마음에 드는 음악을 선택해주세요</h2>

      <div className={musicList}>
        <div className={musicContainer}>
          <div
            className={imageCover}
            onClick={() => handleMusicPlaying('k-pop')}
          >
            <Image
              src="/images/kpop-cover-image.png"
              alt="k-pop"
              fill
              sizes="200px"
              priority
            />

            <div className={imageDimmer}>
              {playing === 'k-pop' ? <Pause /> : <Play />}
            </div>
          </div>

          <span className={genre}>K-POP</span>
          <span className={musicDescription}>I AM · IVE (아이브)</span>

          <button className={selectButton} onClick={() => onNextStep('k-pop')}>
            <span className={selectButtonText}>선택</span>
            <ArrowRight />
          </button>
        </div>

        <div className={musicContainer}>
          <div className={imageCover} onClick={() => handleMusicPlaying('edm')}>
            <Image
              src="/images/edm-cover-image.png"
              alt="edm"
              fill
              sizes="200px"
              priority
            />

            <div className={imageDimmer}>
              {playing === 'edm' ? <Pause /> : <Play />}
            </div>
          </div>

          <span className={genre}>EDM</span>
          <span className={musicDescription}>Infinity · E.P.O</span>

          <button className={selectButton} onClick={() => onNextStep('edm')}>
            <span className={selectButtonText}>선택</span>
            <ArrowRight />
          </button>
        </div>

        <div className={musicContainer}>
          <div
            className={imageCover}
            onClick={() => handleMusicPlaying('classic')}
          >
            <Image
              src="/images/classic-cover-image.png"
              alt="classic"
              fill
              sizes="200px"
              priority
            />

            <div className={imageDimmer}>
              {playing === 'classic' ? <Pause /> : <Play />}
            </div>
          </div>

          <span className={genre}>Classic</span>
          <span className={musicDescription}>세레나데 13번 · 모차르트</span>

          <button
            className={selectButton}
            onClick={() => onNextStep('classic')}
          >
            <span className={selectButtonText}>선택</span>
            <ArrowRight />
          </button>
        </div>
      </div>

      {playing && (
        <div className={nowPlaying}>
          <div className={nowPlayingMusicInfo}>
            <span className={nowPlayingText}>현재 재생 중</span>

            <div className={nowPlayingMusicContent}>
              <div className={playingImageCover}>
                <Image
                  src={
                    playing === 'k-pop'
                      ? '/images/kpop-cover-image.png'
                      : playing === 'edm'
                      ? '/images/edm-cover-image.png'
                      : '/images/classic-cover-image.png'
                  }
                  alt={`${playing}`}
                  fill
                  sizes="200px"
                  priority
                />
              </div>

              <div className={nowPlayingMusicTextContainer}>
                <span className={nowPlayingGenreText}>
                  {playing === 'k-pop'
                    ? 'K-POP'
                    : playing === 'edm'
                    ? 'EDM'
                    : 'Classic'}
                </span>

                <span className={nowPlayingMusicText}>
                  {playing === 'k-pop'
                    ? 'I AM · IVE (아이브)'
                    : playing === 'edm'
                    ? 'Infinity · E.P.O'
                    : '세레나데 13번 · 모차르트'}
                </span>
              </div>
            </div>
          </div>

          {playing === 'k-pop' && (
            <audio controls autoPlay className={audio}>
              <source src="/audio/ive_iam.mp3" type="audio/mpeg" />
            </audio>
          )}
          {playing === 'edm' && (
            <audio controls autoPlay className={audio}>
              <source src="/audio/infinity_magic.mp3" type="audio/mpeg" />
            </audio>
          )}

          {playing === 'classic' && (
            <audio controls autoPlay className={audio}>
              <source src="/audio/mozart.mp3" type="audio/mpeg" />
            </audio>
          )}
        </div>
      )}
    </div>
  )
}
