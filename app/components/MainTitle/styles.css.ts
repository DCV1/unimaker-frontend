import { style } from '@vanilla-extract/css'

export const container = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  height: 'fit-content',
  marginTop: 80,
})

export const title = style({
  fontSize: 44,
  fontWeight: 300,
  lineHeight: '54px',
  letterSpacing: -0.1,
  display: 'inline-block',
  verticalAlign: 'middle',
})

export const quit = style({
  all: 'unset',
  fontSize: 16,
  fontWeight: 500,
  lineHeight: '20px',
  letterSpacing: -0.4,
  height: 32,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
})
