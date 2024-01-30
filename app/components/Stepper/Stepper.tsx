import React from 'react'
import {
  beforeIndicatorCircle,
  beforeIndicatorInnerCircle,
  container,
  indicatorCircle,
  indicatorInnerCircle,
  stepLoad,
  stepText,
  stepperItem,
} from './styles.css'

import Check from '@/public/icon/check-w.svg'

type StepperProps = {
  currentStep: 'music' | 'image' | 'prompt' | 'complete'
}

export const Stepper = ({ currentStep }: StepperProps) => {
  return (
    <div className={container}>
      <div className={stepLoad} />

      <div className={stepperItem}>
        <span className={stepText}>음악 선택</span>

        <span className={indicatorCircle}>
          {currentStep === 'music' ? (
            <span className={indicatorInnerCircle} />
          ) : (
            <Check />
          )}
        </span>
      </div>

      <div className={stepperItem}>
        <span className={stepText}>이미지 선택</span>

        <span
          className={
            currentStep === 'music' ? beforeIndicatorCircle : indicatorCircle
          }
        >
          {currentStep === 'music' ? (
            <span className={beforeIndicatorInnerCircle} />
          ) : currentStep === 'image' ? (
            <span className={indicatorInnerCircle} />
          ) : (
            <Check />
          )}
        </span>
      </div>

      <div className={stepperItem}>
        <span className={stepText}>비디오 설정</span>

        <span
          className={
            currentStep === 'music' || currentStep === 'image'
              ? beforeIndicatorCircle
              : indicatorCircle
          }
        >
          {currentStep === 'music' || currentStep === 'image' ? (
            <span className={beforeIndicatorInnerCircle} />
          ) : currentStep === 'prompt' ? (
            <span className={indicatorInnerCircle} />
          ) : (
            <Check />
          )}
        </span>
      </div>

      <div className={stepperItem}>
        <span className={stepText}>결과 확인</span>

        <span
          className={
            currentStep === 'complete' ? indicatorCircle : beforeIndicatorCircle
          }
        >
          {currentStep === 'complete' ? (
            <span className={indicatorInnerCircle} />
          ) : (
            <span className={beforeIndicatorInnerCircle} />
          )}
        </span>
      </div>
    </div>
  )
}
