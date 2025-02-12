"use client"

import { useState } from "react"
import { useEthers } from "../contexts/EthersContext"

export default function ConnectWallet() {
  const { address, connectWallet } = useEthers()
  const [isOpen, setIsOpen] = useState(false)

  const handleConnect = async (walletType: string) => {
    await connectWallet(walletType)
    setIsOpen(false)
  }

  if (address) {
    return (
      <p className="text-sm">
        Connected: {address.slice(0, 6)}...{address.slice(-4)}
      </p>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="py-2 px-4 font-medium text-white bg-blue-500 rounded hover:bg-blue-400 transition duration-300"
      >
        Connect Wallet
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
          <button
            onClick={() => handleConnect("metamask")}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            MetaMask
          </button>
          <button
            onClick={() => handleConnect("brave")}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Brave Wallet
          </button>
        </div>
      )}
    </div>
  )
}

