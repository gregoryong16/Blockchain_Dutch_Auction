'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import { MetaMaskContextProvider } from '@/hooks/useMetamask'

const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Dutch Auction',
//   description: 'Purchase ERC20 Token',
// }

export default function RootLayout({ children }) {
  { }
  return (
    <html lang="en">
      <body className={inter.className}>
        <MetaMaskContextProvider>
          {children}
        </MetaMaskContextProvider>
      </body>
    </html>
  )
}
