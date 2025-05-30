// import type { Metadata } from 'next'
'use client'
import './globals.css'
import { SessionProvider } from "next-auth/react"
import { GithubProvider } from '@/context/GithubContext'
import { UserProvider } from "@/context/UserContext";
import { ThemeProvider } from '@/components/theme-provider';

// export const metadata: Metadata = {
//   title: 'v0 App',
//   description: 'Created with v0',
//   generator: 'v0.dev',
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <GithubProvider>
            <UserProvider>
              <ThemeProvider attribute="class" defaultTheme="light">
              {children}
              </ThemeProvider>
            </UserProvider>
          </GithubProvider>
        </SessionProvider>
      </body>
    </html>

  )
}
