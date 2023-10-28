import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dutch Auction',
  description: 'Purchase ERC20 Token',
}

export default function RootLayout({ children }) {
  { }
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
