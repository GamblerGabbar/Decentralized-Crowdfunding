"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { ethers } from "ethers"

const EthersContext = createContext(null)

export function EthersProvider({ children }) {
  const [ethersData, setEthersData] = useState({
    provider: null,
    signer: null,
    address: null,
  })

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      setEthersData((prev) => ({ ...prev, provider }))

      window.ethereum.on("accountsChanged", handleAccountsChanged)
      window.ethereum.on("chainChanged", () => window.location.reload())

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
      }
    }
  }, [])

  async function connectWallet(walletType: string) {
    if (typeof window === "undefined" || !window.ethereum) {
      console.error("Ethereum object not found")
      return
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      await provider.send("eth_requestAccounts", [])
      const signer = await provider.getSigner()
      const address = await signer.getAddress()
      setEthersData({ provider, signer, address })
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  function handleAccountsChanged(accounts) {
    if (accounts.length > 0) {
      setEthersData((prev) => ({ ...prev, address: accounts[0] }))
    } else {
      setEthersData((prev) => ({ ...prev, signer: null, address: null }))
    }
  }

  return <EthersContext.Provider value={{ ...ethersData, connectWallet }}>{children}</EthersContext.Provider>
}

export function useEthers() {
  const context = useContext(EthersContext)
  if (context === null) {
    throw new Error("useEthers must be used within an EthersProvider")
  }
  return context
}

