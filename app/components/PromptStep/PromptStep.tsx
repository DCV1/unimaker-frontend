import React, { useState } from 'react'
import { contentContainer } from '../styles.css'
import {
  contentHeader,
  createButton,
  createButtonContainer,
  divider,
  radioBox,
  radioBoxSet,
  selectBox,
  selectBoxDescription,
  selectBoxSelected,
  selectBoxSelectedDescription,
  selectBoxSelectedTitle,
  selectBoxTitle,
  selectedRadioBox,
  styleBoxContainer,
  subTitle,
  title,
  topicBoxContainer,
} from './styles.css'
import Image from 'next/image'

const topicArr = [
  {
    topic: 'maltipoo',
    topicInKorean: '말티즈',
  },
  {
    topic: 'tiger',
    topicInKorean: '호랑이',
  },
  {
    topic: 'space, moon',
    topicInKorean: '우주',
  },
  {
    topic: 'universe',
    topicInKorean: '세계',
  },
  {
    topic: 'a kingdom by the sea with a girl, colorful, beautiful',
    topicInKorean: '성과 소녀',
  },
  {
    topic: 'jamie kim yo new york kdvks',
    topicInKorean: '일본 애니 기차',
  },
] as const

const styleArr = [
  {
    displayTitle: 'Cinematic',
    title: 'cinematic',
    description:
      'photo taken on film, film grain, vintage, 8k ultrafine detail, private press, associated press, associated press photo, masterpiece, cinematic',
  },
  {
    displayTitle: 'Oil painting',
    title: 'oil painting',
    description:
      'an oil painting, 1600s, exquisite detail, baroque painting, voluminous lighting, painterly brushstrokes, edgar degas, john singer sargent, john william waterhouse, masterpiece',
  },
  {
    displayTitle: 'Streampunk',
    title: 'streampunk',
    description:
      'still from a retrofuturistic film, Lofi steampunk, cinematic focus, realistic, highly detailed, masterpiece, by albert robida',
  },
  {
    displayTitle: 'Photo-realistic',
    title: 'photo-realistic',
    description:
      'Photo real, hyper-realistic, high dynamic range, rich colors, lifelike textures, 8K UHD, high color depth, Nikon D 850, Kodak Portra 400, Fujifilm XT',
  },
  {
    displayTitle: 'Japan animation',
    title: 'japan animation',
    description:
      'detailed skies, anime aesthetic, ad posters, light maroon and dark cyan, traincore, qiu shengxian, die brücke —ar 16:9',
  },
] as const

export type TopicType = (typeof topicArr)[number]
export type StyleType = (typeof styleArr)[number]

type PromptStepProps = {
  onCreateVideo: (
    selectedTopic: TopicType,
    selectedStyle: StyleType,
    selectedCamera: string[],
    selectedAudioReactive: 'none' | 'low' | 'medium' | 'high',
    selectedZoom: string[],
    selectedRotate: string[]
  ) => Promise<void>
  progress: number
}

export const PromptStep = ({ onCreateVideo, progress }: PromptStepProps) => {
  const [selectedTopic, setSelectedTopic] = useState<TopicType>()
  const [selectedStyle, setSelectedStyle] = useState<StyleType>()
  const [selectedCamera, setSelectedCamera] = useState<string[]>([])
  const [selectedAudioReactive, setSelectedAudioReactive] = useState<
    'none' | 'low' | 'medium' | 'high'
  >()
  const [selectedZoom, setSelectedZoom] = useState<string[]>([])
  const [selectedRotate, setSelectedRotate] = useState<string[]>([])

  if (progress === -1)
    return (
      <div className={contentContainer} style={{ height: 1500 }}>
        <h2 className={title}>영상 주제</h2>

        {selectedTopic !== undefined &&
          selectedStyle !== undefined &&
          selectedCamera.length !== 0 &&
          selectedAudioReactive !== undefined && (
            <div className={createButtonContainer}>
              <button
                className={createButton}
                onClick={() =>
                  onCreateVideo(
                    selectedTopic,
                    selectedStyle,
                    selectedCamera,
                    selectedAudioReactive,
                    selectedZoom,
                    selectedRotate
                  )
                }
                disabled={progress !== -1}
              >
                뮤직 비디오 만들기
              </button>
            </div>
          )}

        <div className={topicBoxContainer}>
          {topicArr.slice(0, 4).map(topic => (
            <div
              className={
                selectedTopic === topic ? selectBoxSelected : selectBox
              }
              key={topic.topic}
              style={{
                height: '80px',
                width: '160px',
              }}
              onClick={() => setSelectedTopic(topic)}
            >
              <span
                className={
                  selectedTopic === topic
                    ? selectBoxSelectedTitle
                    : selectBoxTitle
                }
              >
                {topic.topicInKorean}
              </span>
              <span
                className={
                  selectedTopic === topic
                    ? selectBoxSelectedDescription
                    : selectBoxDescription
                }
              >
                {topic.topic}
              </span>
            </div>
          ))}
        </div>
        <div className={topicBoxContainer} style={{ marginTop: 24 }}>
          {topicArr.slice(4, 6).map(topic => (
            <div
              className={
                selectedTopic === topic ? selectBoxSelected : selectBox
              }
              key={topic.topic}
              style={{
                height: '100px',
                width: '200px',
              }}
              onClick={() => setSelectedTopic(topic)}
            >
              <span
                className={
                  selectedTopic === topic
                    ? selectBoxSelectedTitle
                    : selectBoxTitle
                }
              >
                {topic.topicInKorean}
              </span>
              <span
                className={
                  selectedTopic === topic
                    ? selectBoxSelectedDescription
                    : selectBoxDescription
                }
              >
                {topic.topic}
              </span>
            </div>
          ))}
        </div>

        <h2
          className={title}
          style={{
            marginTop: 64,
          }}
        >
          스타일링
        </h2>

        <div className={styleBoxContainer}>
          {styleArr.map(style => (
            <div
              className={
                selectedStyle === style ? selectBoxSelected : selectBox
              }
              key={style.title}
              style={{ width: 'fit-content' }}
              onClick={() => setSelectedStyle(style)}
            >
              <span
                className={
                  selectedStyle === style
                    ? selectBoxSelectedTitle
                    : selectBoxTitle
                }
              >
                {style.title}
              </span>
              <span
                className={
                  selectedStyle === style
                    ? selectBoxSelectedDescription
                    : selectBoxDescription
                }
              >
                {style.description}
              </span>
            </div>
          ))}
        </div>

        <h3 className={subTitle}>카메라 이동 설정</h3>

        <div className={radioBoxSet}>
          {/* camera movement None */}
          <div
            className={
              selectedCamera.includes('none') ? selectedRadioBox : radioBox
            }
            onClick={() => {
              setSelectedCamera(['none'])
              setSelectedZoom([])
              setSelectedRotate([])
            }}
          >
            없음
          </div>
        </div>

        <div className={divider} />

        <div className={radioBoxSet}>
          {/* camera left */}
          <div
            className={
              selectedCamera.includes('left') ? selectedRadioBox : radioBox
            }
            onClick={() => {
              if (selectedCamera.includes('none')) {
                const index = selectedCamera.findIndex(
                  value => value === 'none'
                )
                selectedCamera.splice(index, 1)
              }

              if (selectedCamera.includes('right')) {
                const index = selectedCamera.findIndex(
                  value => value === 'right'
                )
                selectedCamera.splice(index, 1)
              }

              if (selectedCamera.includes('left')) {
                const index = selectedCamera.findIndex(
                  value => value === 'left'
                )
                selectedCamera.splice(index, 1)
              } else {
                selectedCamera.push('left')
              }

              setSelectedCamera([...selectedCamera])
            }}
          >
            왼쪽으로 이동
          </div>
          {/* camera right */}
          <div
            className={
              selectedCamera.includes('right') ? selectedRadioBox : radioBox
            }
            onClick={() => {
              if (selectedCamera.includes('none')) {
                const index = selectedCamera.findIndex(
                  value => value === 'none'
                )
                selectedCamera.splice(index, 1)
              }

              if (selectedCamera.includes('left')) {
                const index = selectedCamera.findIndex(
                  value => value === 'left'
                )
                selectedCamera.splice(index, 1)
              }

              if (selectedCamera.includes('right')) {
                const index = selectedCamera.findIndex(
                  value => value === 'right'
                )
                selectedCamera.splice(index, 1)
              } else {
                selectedCamera.push('right')
              }

              setSelectedCamera([...selectedCamera])
            }}
          >
            오른쪽으로 이동
          </div>
          {/* camera up */}
          <div
            className={
              selectedCamera.includes('up') ? selectedRadioBox : radioBox
            }
            onClick={() => {
              if (selectedCamera.includes('none')) {
                const index = selectedCamera.findIndex(
                  value => value === 'none'
                )
                selectedCamera.splice(index, 1)
              }

              if (selectedCamera.includes('down')) {
                const index = selectedCamera.findIndex(
                  value => value === 'down'
                )
                selectedCamera.splice(index, 1)
              }

              if (selectedCamera.includes('up')) {
                const index = selectedCamera.findIndex(value => value === 'up')
                selectedCamera.splice(index, 1)
              } else {
                selectedCamera.push('up')
              }

              setSelectedCamera([...selectedCamera])
            }}
          >
            위쪽으로 이동
          </div>
          {/* camera down */}
          <div
            className={
              selectedCamera.includes('down') ? selectedRadioBox : radioBox
            }
            onClick={() => {
              if (selectedCamera.includes('none')) {
                const index = selectedCamera.findIndex(
                  value => value === 'none'
                )
                selectedCamera.splice(index, 1)
              }

              if (selectedCamera.includes('up')) {
                const index = selectedCamera.findIndex(value => value === 'up')
                selectedCamera.splice(index, 1)
              }

              if (selectedCamera.includes('down')) {
                const index = selectedCamera.findIndex(
                  value => value === 'down'
                )
                selectedCamera.splice(index, 1)
              } else {
                selectedCamera.push('down')
              }

              setSelectedCamera([...selectedCamera])
            }}
          >
            아래쪽으로 이동
          </div>
        </div>

        <div className={radioBoxSet}>
          {/* zoom in */}
          <div
            className={
              selectedZoom.includes('zoomin') ? selectedRadioBox : radioBox
            }
            onClick={() => {
              if (selectedZoom.includes('none')) {
                const index = selectedZoom.findIndex(value => value === 'none')
                selectedZoom.splice(index, 1)
              }

              if (selectedZoom.includes('zoomout')) {
                const index = selectedZoom.findIndex(
                  value => value === 'zoomout'
                )
                selectedZoom.splice(index, 1)
              }

              if (selectedZoom.includes('zoomin')) {
                const index = selectedZoom.findIndex(
                  value => value === 'zoomin'
                )
                selectedZoom.splice(index, 1)
              } else {
                selectedZoom.push('zoomin')
              }

              setSelectedZoom([...selectedZoom])
            }}
          >
            줌 인
          </div>
          {/* zoom out */}
          <div
            className={
              selectedZoom.includes('zoomout') ? selectedRadioBox : radioBox
            }
            onClick={() => {
              if (selectedZoom.includes('none')) {
                const index = selectedZoom.findIndex(value => value === 'none')
                selectedZoom.splice(index, 1)
              }

              if (selectedZoom.includes('zoomin')) {
                const index = selectedZoom.findIndex(
                  value => value === 'zoomin'
                )
                selectedZoom.splice(index, 1)
              }

              if (selectedZoom.includes('zoomout')) {
                const index = selectedZoom.findIndex(
                  value => value === 'zoomout'
                )
                selectedZoom.splice(index, 1)
              } else {
                selectedZoom.push('zoomout')
              }

              setSelectedZoom([...selectedZoom])
            }}
          >
            줌 아웃
          </div>
        </div>

        <div className={radioBoxSet}>
          {/* clockwise rotate */}
          <div
            className={
              selectedRotate.includes('clock') ? selectedRadioBox : radioBox
            }
            onClick={() => {
              if (selectedRotate.includes('none')) {
                const index = selectedRotate.findIndex(
                  value => value === 'none'
                )
                selectedRotate.splice(index, 1)
              }

              if (selectedRotate.includes('cclock')) {
                const index = selectedRotate.findIndex(
                  value => value === 'cclock'
                )
                selectedRotate.splice(index, 1)
              }

              if (selectedRotate.includes('clock')) {
                const index = selectedRotate.findIndex(
                  value => value === 'clock'
                )
                selectedRotate.splice(index, 1)
              } else {
                selectedRotate.push('clock')
              }

              setSelectedRotate([...selectedRotate])
            }}
          >
            시계 방향으로 회전
          </div>
          {/* counter-clockwise rotate */}
          <div
            className={
              selectedRotate.includes('cclock') ? selectedRadioBox : radioBox
            }
            onClick={() => {
              if (selectedRotate.includes('none')) {
                const index = selectedRotate.findIndex(
                  value => value === 'none'
                )
                selectedRotate.splice(index, 1)
              }

              if (selectedRotate.includes('clock')) {
                const index = selectedRotate.findIndex(
                  value => value === 'clock'
                )
                selectedRotate.splice(index, 1)
              }

              if (selectedRotate.includes('cclock')) {
                const index = selectedRotate.findIndex(
                  value => value === 'cclock'
                )
                selectedRotate.splice(index, 1)
              } else {
                selectedRotate.push('cclock')
              }

              setSelectedRotate([...selectedRotate])
            }}
          >
            반시계 방향으로 회전
          </div>
        </div>

        {/* <div className={divider} />

      <div className={radioBoxSet}>
        <div
          className={
            selectedCamera.includes('zoomIn') ? selectedRadioBox : radioBox
          }
          onClick={() => {
            if (selectedCamera.includes('zoomOut')) {
              const index = selectedCamera.findIndex(
                value => value === 'zoomOut'
              )
              selectedCamera.splice(index, 1)
            }

            selectedCamera.push('zoomIn')
            setSelectedCamera([...selectedCamera])
          }}
        >
          확대
        </div>
        <div
          className={
            selectedCamera.includes('zoomOut') ? selectedRadioBox : radioBox
          }
          onClick={() => {
            if (selectedCamera.includes('zoomIn')) {
              const index = selectedCamera.findIndex(
                value => value === 'zoomIn'
              )
              selectedCamera.splice(index, 1)
            }

            selectedCamera.push('zoomOut')
            setSelectedCamera([...selectedCamera])
          }}
        >
          축소
        </div>
      </div>

      <div className={divider} />

      <div className={radioBoxSet}>
        <div
          className={
            selectedCamera.includes('rotate') ? selectedRadioBox : radioBox
          }
          onClick={() => {
            if (selectedCamera.includes('rotate')) {
              const index = selectedCamera.findIndex(
                value => value === 'rotate'
              )
              selectedCamera.splice(index, 1)
            } else {
              selectedCamera.push('rotate')
            }

            setSelectedCamera([...selectedCamera])
          }}
        >
          회전
        </div>
      </div> */}

        <h3 className={subTitle}>Audio Reactive</h3>

        <div className={radioBoxSet}>
          <div
            className={
              selectedAudioReactive === 'none' ? selectedRadioBox : radioBox
            }
            onClick={() => setSelectedAudioReactive('none')}
          >
            None
          </div>
          <div
            className={
              selectedAudioReactive === 'low' ? selectedRadioBox : radioBox
            }
            onClick={() => setSelectedAudioReactive('low')}
          >
            Low
          </div>
          <div
            className={
              selectedAudioReactive === 'medium' ? selectedRadioBox : radioBox
            }
            onClick={() => setSelectedAudioReactive('medium')}
          >
            Medium
          </div>
          <div
            className={
              selectedAudioReactive === 'high' ? selectedRadioBox : radioBox
            }
            onClick={() => setSelectedAudioReactive('high')}
          >
            High
          </div>
        </div>
      </div>
    )

  return (
    <div className={contentContainer} style={{ height: 1500 }}>
      <h2 className={title}>
        영상을 생성 중입니다. 생성 할 동안 아래 설문 참여 부탁드립니다!
      </h2>

      <Image src="/images/QRcode.png" alt="qrcode" width={800} height={800} />

      <div className={createButtonContainer}>
        <button className={createButton} disabled>
          영상 생성 중... (${(progress * 100).toFixed(2)}%)
        </button>
      </div>
    </div>
  )
}
