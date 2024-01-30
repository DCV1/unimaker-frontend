import { style } from '@vanilla-extract/css'

export const contentHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
})

export const title = style({
  fontSize: 22,
  fontWeight: 600,
  lineHeight: '28px',
  letterSpacing: -0.1,
  marginBottom: 32,
})

export const selectBox = style({
  borderRadius: 16,
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  backgroundColor: '#F6F6F6',
  gap: 8,
  cursor: 'pointer',
})

export const selectBoxSelected = style({
  borderRadius: 16,
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  backgroundColor: '#233067',
  gap: 8,
  cursor: 'pointer',
})

export const selectBoxTitle = style({
  fontSize: 16,
  fontWeight: 700,
  lineHeight: '20px',
  letterSpacing: -0.4,
  color: '#000000',
})

export const selectBoxSelectedTitle = style({
  fontSize: 16,
  fontWeight: 700,
  lineHeight: '20px',
  letterSpacing: -0.4,
  color: '#FFFFFF',
})

export const selectBoxDescription = style({
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '20px',
  letterSpacing: -0.4,
  color: '#585858',
})

export const selectBoxSelectedDescription = style({
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '20px',
  letterSpacing: -0.4,
  color: '#E1E1E1',
})

export const topicBoxContainer = style({
  display: 'flex',
  gap: 24,
})

export const styleBoxContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
})

export const createButtonContainer = style({
  position: 'fixed',
  bottom: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 80,
  width: '100vw',
  zIndex: 1000,
  backgroundColor: 'white',
})

export const createButton = style({
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 1280,
  height: 48,
  paddingLeft: 24,
  paddingRight: 24,
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

export const subTitle = style({
  fontSize: 18,
  fontWeight: 500,
  lineHeight: '24px',
  letterSpacing: -0.4,
  color: '#585858',
  marginTop: 42,
  marginBottom: 0,
})

export const radioBox = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #233067',
  borderRadius: 16,
  height: 36,
  boxSizing: 'border-box',
  padding: '0 12px',
  width: 'fit-content',
  color: '#233067',
  fontSize: 16,
  fontWeight: 400,
  lineHeight: '20px',
  letterSpacing: -0.4,
  cursor: 'pointer',
})

export const selectedRadioBox = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 16,
  height: 36,
  boxSizing: 'border-box',
  padding: '0 12px',
  width: 'fit-content',
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: 400,
  lineHeight: '20px',
  letterSpacing: -0.4,
  backgroundColor: '#233067',
  cursor: 'pointer',
})

export const radioBoxSet = style({
  marginTop: 16,
  display: 'flex',
  gap: 16,
})

export const divider = style({
  width: 400,
  height: 1,
  backgroundColor: '#C9C9C9',
  marginTop: 16,
})
