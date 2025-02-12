"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import ProjectList from "../../components/ProjectList"

export default function SearchPage() {
  const [projects, setProjects] = useState([])
  const searchParams = useSearchParams()
  const query = searchParams.get("q")

  useEffect(() => {
    // In a real application, you would fetch projects based on the search query
    // For this demo, we'll just filter the demo project
    const demoProject = {
      id: 0,
      creator: "0x1234...5678",
      name: "Demo Project",
      description: "This is a demo project for our decentralized crowdfunding platform.",
      goal: "10",
      currentAmount: "5",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleString(),
      currentMilestone: 0,
      votesForNextMilestone: 3,
      tokenAddress: "0x0000...0000",
    }

    if (
      query &&
      (demoProject.name.toLowerCase().includes(query.toLowerCase()) ||
        demoProject.description.toLowerCase().includes(query.toLowerCase()))
    ) {
      setProjects([demoProject])
    } else {
      setProjects([])
    }
  }, [query])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Search Results for "{query}"</h1>
      {projects.length > 0 ? <ProjectList projects={projects} /> : <p>No projects found matching your search.</p>}
    </div>
  )
}

