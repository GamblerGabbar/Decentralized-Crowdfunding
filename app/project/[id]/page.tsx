"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { ethers } from "ethers"
import CrowdfundingPlatform from "@/contracts/CrowdfundingPlatform.json"
import { useEthers } from "@/contexts/EthersContext"

export default function ProjectPage() {
  const router = useRouter()
  const { id } = router.query
  const [project, setProject] = useState(null)
  const [contribution, setContribution] = useState("")
  const { provider, signer, address } = useEthers()

  useEffect(() => {
    if (provider && id) {
      loadProject()
    }
  }, [provider, id])

  async function loadProject() {
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, CrowdfundingPlatform.abi, provider)
    const projectDetails = await contract.getProjectDetails(id)
    const milestones = await contract.getMilestones(id)

    setProject({
      id,
      creator: projectDetails.creator,
      name: projectDetails.name,
      description: projectDetails.description,
      goal: ethers.formatEther(projectDetails.goal),
      currentAmount: ethers.formatEther(projectDetails.currentAmount),
      deadline: new Date(Number(projectDetails.deadline) * 1000).toLocaleString(),
      currentMilestone: Number(projectDetails.currentMilestone),
      votesForNextMilestone: Number(projectDetails.votesForNextMilestone),
      tokenAddress: projectDetails.tokenAddress,
      milestones: milestones.map((m) => Number(m)),
    })
  }

  async function handleContribute(e) {
    e.preventDefault()
    if (!signer) return

    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, CrowdfundingPlatform.abi, signer)

    try {
      const tx = await contract.contribute(id, { value: ethers.parseEther(contribution) })
      await tx.wait()
      loadProject()
      setContribution("")
    } catch (error) {
      console.error("Error contributing to project:", error)
    }
  }

  async function handleVoteForMilestone() {
    if (!signer) return

    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, CrowdfundingPlatform.abi, signer)

    try {
      const tx = await contract.voteForNextMilestone(id)
      await tx.wait()
      loadProject()
    } catch (error) {
      console.error("Error voting for milestone:", error)
    }
  }

  if (!project) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{project.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="mb-4">{project.description}</p>
          <p className="mb-2">Goal: {project.goal} ETH</p>
          <p className="mb-2">Raised: {project.currentAmount} ETH</p>
          <p className="mb-2">Deadline: {project.deadline}</p>
          <p className="mb-2">Creator: {project.creator}</p>
          <p className="mb-2">
            Current Milestone: {project.currentMilestone + 1} of {project.milestones.length}
          </p>
          <p className="mb-2">Votes for Next Milestone: {project.votesForNextMilestone}</p>
          <h3 className="text-xl font-semibold mt-4 mb-2">Milestones</h3>
          <ul className="list-disc list-inside">
            {project.milestones.map((milestone, index) => (
              <li key={index} className={index < project.currentMilestone ? "line-through" : ""}>
                {milestone}% of funds released
              </li>
            ))}
          </ul>
        </div>
        <div>
          <form onSubmit={handleContribute} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Contribute to Project</h2>
            <div className="mb-4">
              <label htmlFor="contribution" className="block mb-2">
                Amount (ETH)
              </label>
              <input
                type="number"
                id="contribution"
                value={contribution}
                onChange={(e) => setContribution(e.target.value)}
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
              Contribute
            </button>
          </form>
          <button onClick={handleVoteForMilestone} className="px-4 py-2 bg-blue-500 text-white rounded">
            Vote for Next Milestone
          </button>
        </div>
      </div>
    </div>
  )
}