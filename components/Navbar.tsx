"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import ConnectWallet from "./ConnectWallet"
import { Search, PlusCircle } from "lucide-react"

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <nav className="bg-primary text-primary-foreground shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl">🌊 OceanFund</span>
          </Link>
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                className="bg-secondary text-secondary-foreground rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
                type="search"
                name="search"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-primary" />
              </button>
            </form>
            <Link
              href="/create-project"
              className="flex items-center space-x-1 bg-secondary text-secondary-foreground py-2 px-4 rounded-full hover:bg-secondary/80 transition duration-300"
            >
              <PlusCircle className="h-5 w-5" />
              <span>Create Project</span>
            </Link>
            <ConnectWallet />
          </div>
        </div>
      </div>
    </nav>
  )
}

