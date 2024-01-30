import Image from 'next/image'
import { main } from './styles.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <div
        style={{
          width: '100%',
          position: 'relative',
          aspectRatio: '1920 / 600',
        }}
      >
        <Image
          src="/images/main.png"
          alt="main"
          fill
          style={{
            aspectRatio: '1920 / 600',
          }}
        />

        <h1
          style={{
            fontSize: 38,
            fontWeight: '400',
            lineHeight: '46px',
            letterSpacing: '-0.1px',
            color: '#FFF',
            zIndex: 10,
            position: 'absolute',
            top: '30%',
            left: '10%',
          }}
        >
          GLANCE
        </h1>
        <h2
          style={{
            fontSize: '56px',
            fontWeight: '600',
            lineHeight: '68px',
            letterSpacing: '-0.1px',
            color: '#FFF',
            zIndex: 10,
            position: 'absolute',
            top: '45%',
            left: '10%',
          }}
        >
          Make Better Eyes Make Better World
        </h2>

        <Link
          href="/createVideo"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 52,
            padding: '0 32px',
            fontSize: '16px',
            fontWeight: '600',
            lineHeight: '20px',
            letterSpacing: '-0.4px',
            color: '#FFFFFF',
            backgroundColor: '#233067',
            borderRadius: '16px',
            position: 'absolute',
            top: '65%',
            left: '10%',
            textDecoration: 'none',
          }}
        >
          영상 만들기
        </Link>
      </div>
    </main>
  )
}
