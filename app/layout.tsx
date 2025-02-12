import { EthersProvider } from "../contexts/EthersContext"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "../styles/globals.css"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <EthersProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </EthersProvider>
      </body>
    </html>
  )
}

export const metadata = {
  title: "DeFund - Decentralized Crowdfunding",
  description: "A decentralized crowdfunding platform built on blockchain technology.",
    generator: 'v0.dev'
}



import './globals.css'