'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import { MetaMaskContextProvider } from '@/hooks/useMetamask'
import { ChakraProvider, Box, ColorModeScript } from '@chakra-ui/react'
import theme from '@/utils/theme'

const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Dutch Auction',
//   description: 'Purchase ERC20 Token',
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider>
          <MetaMaskContextProvider>
              {children}
          </MetaMaskContextProvider>
        </ChakraProvider>
      </body>
    </html>
  )
}
