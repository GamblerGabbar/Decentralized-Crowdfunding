"use client"

import { useState } from "react"
import { ethers } from "ethers"
import { useEthers } from "../contexts/EthersContext"
import CrowdfundingPlatform from "../contracts/CrowdfundingPlatform.json"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function CreateProjectForm({ onProjectCreated }) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [goal, setGoal] = useState("")
  const [deadline, setDeadline] = useState("")
  const [milestones, setMilestones] = useState([""])
  const [image, setImage] = useState(null)
  const { signer } = useEthers()

  async function handleSubmit(e) {
    e.preventDefault()

    if (!signer) {
      console.log("Project created (simulated):", { name, description, goal, deadline, milestones, image })
      onProjectCreated()
      resetForm()
      return
    }

    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, CrowdfundingPlatform.abi, signer)

    try {
      // In a real-world scenario, you'd upload the image to IPFS or a similar service
      // and store the resulting hash/URL in the contract
      const imageUrl = image ? URL.createObjectURL(image) : ""

      const tx = await contract.createProject(
        name,
        description,
        ethers.parseEther(goal),
        Math.floor(new Date(deadline).getTime() / 1000),
        milestones.map((m) => Number.parseInt(m)),
        imageUrl,
      )
      await tx.wait()
      onProjectCreated()
      resetForm()
    } catch (error) {
      console.error("Error creating project:", error)
    }
  }

  function resetForm() {
    setName("")
    setDescription("")
    setGoal("")
    setDeadline("")
    setMilestones([""])
    setImage(null)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-2 font-medium">
          Project Name
        </label>
        <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="description" className="block mb-2 font-medium">
          Description
        </label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="goal" className="block mb-2 font-medium">
          Funding Goal (ETH)
        </label>
        <Input
          type="number"
          id="goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          required
          min="0"
          step="0.01"
        />
      </div>
      <div>
        <label htmlFor="deadline" className="block mb-2 font-medium">
          Deadline
        </label>
        <Input
          type="datetime-local"
          id="deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="image" className="block mb-2 font-medium">
          Project Image
        </label>
        <Input type="file" id="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      </div>
      <div>
        <label className="block mb-2 font-medium">Milestones (% of funds to release)</label>
        {milestones.map((milestone, index) => (
          <div key={index} className="flex mb-2">
            <Input
              type="number"
              value={milestone}
              onChange={(e) => {
                const newMilestones = [...milestones]
                newMilestones[index] = e.target.value
                setMilestones(newMilestones)
              }}
              required
              min="0"
              max="100"
              className="flex-grow"
            />
            {index === milestones.length - 1 && (
              <Button type="button" onClick={() => setMilestones([...milestones, ""])} className="ml-2">
                +
              </Button>
            )}
          </div>
        ))}
      </div>
      <Button type="submit" className="w-full">
        Create Project
      </Button>
    </form>
  )
}

