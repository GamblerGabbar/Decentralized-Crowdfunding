"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import ProjectList from "../../components/ProjectList"

function SearchResults() {
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

// Loading component to show while the search results are being processed
function SearchLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-3/4 mb-8"></div>
        <div className="space-y-4">
          <div className="h-40 bg-gray-200 rounded"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchResults />
    </Suspense>
  )
}