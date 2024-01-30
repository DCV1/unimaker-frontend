import { style } from '@vanilla-extract/css'

export const title = style({
  color: '#000000',
  fontSize: 22,
  fontWeight: 600,
  lineHeight: '28px',
  letterSpacing: -0.1,
})

export const musicList = style({
  display: 'flex',
  gap: 120,
  margin: '0 auto',
  marginTop: 54,
})

export const musicContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
})

export const imageCover = style({
  width: 200,
  height: 200,
  position: 'relative',
  borderRadius: 4,
  overflow: 'hidden',
})

export const imageDimmer = style({
  width: 200,
  height: 200,
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0, 0, 0, 0.20)',
  cursor: 'pointer',
})

export const genre = style({
  color: '#000000',
  fontSize: 20,
  fontWeight: 600,
  lineHeight: '26px',
  letterSpacing: -0.4,
  width: 200,
  marginTop: 20,
  marginBottom: 4,
})

export const musicDescription = style({
  color: '#585858',
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '18px',
  letterSpacing: -0.4,
  width: 200,
})

export const selectButton = style({
  border: 'none',
  paddingLeft: 24,
  paddingRight: 16,
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  borderRadius: 8,
  backgroundColor: '#EEEEEE',
  height: 48,
  marginTop: 20,
  cursor: 'pointer',
})

export const selectButtonText = style({
  fontSize: 16,
  fontWeight: 500,
  lineHeight: '20px',
  letterSpacing: -0.4,
})

export const playingImageCover = style({
  width: 80,
  height: 80,
  position: 'relative',
  borderRadius: 4,
  overflow: 'hidden',
})

export const nowPlaying = style({
  display: 'flex',
  alignItems: 'flex-end',
  marginLeft: 220 - 54,
  marginTop: 64,
})

export const nowPlayingMusicInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  marginRight: 40,
})

export const nowPlayingMusicContent = style({
  display: 'flex',
  alignItems: 'flex-end',
})

export const nowPlayingMusicTextContainer = style({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 16,
})

export const nowPlayingText = style({
  color: '#585858',
  fontSize: 18,
  fontWeight: 500,
  lineHeight: '24px',
  letterSpacing: -0.4,
})

export const nowPlayingGenreText = style({
  color: '#000000',
  fontSize: 20,
  fontWeight: 600,
  lineHeight: '26px',
  letterSpacing: -0.4,
})

export const nowPlayingMusicText = style({
  color: '#585858',
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '18px',
  letterSpacing: -0.4,
})

export const audio = style({
  width: 600,
})
