import { globalStyle } from '@vanilla-extract/css'

globalStyle('*', {
  boxSizing: 'border-box',
})

globalStyle('body', {
  margin: 0,
  backgroundColor: '#F6F6F6',
})

globalStyle('h1, h2', {
  margin: 0,
})
