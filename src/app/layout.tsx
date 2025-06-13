import './globals.css'
import { Inter, Space_Grotesk } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-body',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
})

export const metadata = {
  title: 'Sheikh Chat - Powered by Google Gemini',
  description: 'An AI chat interface using Google Gemini and Vercel AI SDK',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body bg-background`}>
        {children}
      </body>
    </html>
  )
}
