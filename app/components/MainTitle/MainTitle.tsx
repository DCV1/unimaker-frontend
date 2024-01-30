import React from 'react'
import { container, quit, title } from './styles.css'
import Link from 'next/link'

export const MainTitle = () => {
  return (
    <div className={container}>
      <h1 className={title}>나만의 뮤직 비디오 만들기</h1>
    </div>
  )
}
