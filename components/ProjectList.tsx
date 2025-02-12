"use client"
import Image from "next/image"
import { useState } from "react"
import { useEthers } from "../contexts/EthersContext"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ProjectList({ projects }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}

function ProjectCard({ project }) {
  const [donationAmount, setDonationAmount] = useState("")
  const [comment, setComment] = useState("")
  const { signer } = useEthers()

  const handleDonate = async (e) => {
    e.preventDefault()
    if (!signer) {
      alert("Please connect your wallet to donate.")
      return
    }

    console.log(`Donated ${donationAmount} ETH to project ${project.id}`)
    setDonationAmount("")
  }

  const handleComment = (e) => {
    e.preventDefault()
    console.log(`New comment on project ${project.id}: ${comment}`)
    setComment("")
  }

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="bg-primary text-primary-foreground p-0">
        {project.imageUrl && (
          <Image
            src={project.imageUrl || "/placeholder.svg"}
            alt={project.name}
            width={400}
            height={200}
            className="w-full h-48 object-cover"
          />
        )}
        <CardTitle className="p-4">{project.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Goal:</span> {project.goal} ETH
          </p>
          <p>
            <span className="font-semibold">Raised:</span> {project.currentAmount} ETH
          </p>
          <p>
            <span className="font-semibold">Deadline:</span> {project.deadline}
          </p>
        </div>
      </CardContent>
      <CardFooter className="bg-muted p-6 flex flex-col space-y-4">
        <form onSubmit={handleDonate} className="w-full space-y-2">
          <Input
            type="number"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            placeholder="Amount in ETH"
            min="0"
            step="0.01"
          />
          <Button type="submit" className="w-full">
            Donate
          </Button>
        </form>
        <form onSubmit={handleComment} className="w-full space-y-2">
          <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Leave a comment..." />
          <Button type="submit" variant="outline" className="w-full">
            Comment
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

