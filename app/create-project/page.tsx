"use client"
import { useRouter } from "next/navigation"
import CreateProjectForm from "../../components/CreateProjectForm"

export default function CreateProjectPage() {
  const router = useRouter()

  const handleProjectCreated = () => {
    router.push("/")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Create New Project</h1>
      <CreateProjectForm onProjectCreated={handleProjectCreated} />
    </div>
  )
}

