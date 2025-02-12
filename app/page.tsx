"use client"

import { useState, useEffect } from "react"
import ProjectList from "../components/ProjectList"
import { useEthers } from "../contexts/EthersContext"

export default function Home() {
  const [projects, setProjects] = useState([])
  const { provider, signer, address } = useEthers()

  useEffect(() => {
    // Load demo project
    const demoProject = {
      id: 0,
      creator: "0x1234...5678",
      name: "Ocean Cleanup Initiative",
      description: "Help us clean up the oceans and protect marine life with this innovative project.",
      goal: "10",
      currentAmount: "5",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleString(),
      currentMilestone: 0,
      votesForNextMilestone: 3,
      tokenAddress: "0x0000...0000",
      imageUrl: "/placeholder.svg?height=200&width=400",
    }
    setProjects([demoProject])
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">DeFund: Decentralized Crowdfunding</h1>
      <ProjectList projects={projects} />
    </div>
  )
}

