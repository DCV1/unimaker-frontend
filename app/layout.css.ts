import { style } from '@vanilla-extract/css'

export const header = style({
  height: 80,
  backgroundColor: 'white',
})

export const headerContent = style({
  height: '100%',
  maxWidth: 1280,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
})

export const logo = style({
  fontSize: 38,
  fontWeight: 500,
  lineHeight: '46px',
  letterSpacing: -0.1,
})
