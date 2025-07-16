import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SecurityProvider } from '@/components/SecurityProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hanzla Habib - Senior Frontend Developer',
  description: 'Portfolio of Hanzla Habib - From Designer to Senior Frontend Developer. A journey through crisis and evolution.',
  keywords: 'Hanzla Habib, Frontend Developer, React, Next.js, TypeScript, Designer, Full Stack Developer',
  authors: [{ name: 'Hanzla Habib' }],
  creator: 'Hanzla Habib',
  publisher: 'Hanzla Habib',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Hanzla Habib - Senior Frontend Developer',
    description: 'Portfolio showcasing the evolution from designer to senior frontend developer',
    siteName: 'Hanzla Habib Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hanzla Habib - Senior Frontend Developer',
    description: 'Portfolio showcasing the evolution from designer to senior frontend developer',
    creator: '@hanzlahabib',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SecurityProvider>
          {children}
        </SecurityProvider>
      </body>
    </html>
  )
}