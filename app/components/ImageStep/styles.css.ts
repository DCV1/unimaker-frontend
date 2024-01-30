import { style } from '@vanilla-extract/css'

export const contentHeader = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
})

export const title = style({
  fontSize: 22,
  fontWeight: 600,
  lineHeight: '28px',
  letterSpacing: -0.1,
  width: 'fit-content',
})

export const skipButton = style({
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  height: 48,
  paddingLeft: 24,
  paddingRight: 16,
  gap: 4,
  borderRadius: 8,
  backgroundColor: '#EEEEEE',
  color: '#0000000',

  fontSize: 16,
  fontWeight: 500,
  lineHeight: '20px',
  letterSpacing: -0.4,
  cursor: 'pointer',
})

export const selectButton = style({
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  height: 48,
  paddingLeft: 24,
  paddingRight: 16,
  gap: 4,
  borderRadius: 8,
  backgroundColor: '#233067',
  color: '#FFFFFF',

  fontSize: 16,
  fontWeight: 500,
  lineHeight: '20px',
  letterSpacing: -0.4,
  cursor: 'pointer',
})

export const buttonSet = style({
  display: 'flex',
  gap: 24,
})

export const arrowButton = style({
  background: 'transparent',
  border: 'none',
  width: 64,
  height: 64,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
})

export const mainImageContainer = style({
  display: 'flex',
  alignItems: 'center',
  margin: '0 auto',
  marginTop: 54,
  gap: 32,
})

export const imageList = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,
  marginTop: 40,
  marginLeft: -46,
})
