import { style } from '@vanilla-extract/css'

export const container = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-between',
  position: 'relative',
  marginTop: 48,
})

export const stepperItem = style({
  display: 'flex',
  width: 160,
  flexDirection: 'column',
  alignItems: 'center',
})

export const stepText = style({
  fontSize: 16,
  fontWeight: 500,
  lineHeight: '20px',
  letterSpacing: -0.4,
})

export const indicatorCircle = style({
  width: 32,
  height: 32,
  borderRadius: 9999,
  backgroundColor: '#233067',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 16,
})

export const beforeIndicatorCircle = style({
  width: 32,
  height: 32,
  borderRadius: 9999,
  backgroundColor: '#EEEEEE',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 16,
})

export const indicatorInnerCircle = style({
  width: 16,
  height: 16,
  borderRadius: 9999,
  backgroundColor: 'white',
})

export const beforeIndicatorInnerCircle = style({
  width: 16,
  height: 16,
  borderRadius: 9999,
  backgroundColor: '#233067',
})

export const stepLoad = style({
  width: 1120,
  height: 4,
  backgroundColor: '#eeeeee',
  position: 'absolute',
  bottom: 14,
  left: 80,
  zIndex: -1,
})
