import React, { useEffect, useState } from "react"
import ProblemDisplay from "../components/ProblemDisplay"
import CodeEditor from "../components/CodeEditor"
import { useLocation } from "react-router-dom"
import { Problem } from "../api/problemApi"
export default function ProblemPage() {
  const location = useLocation()
  const [problem, setProblem] = useState<Problem | null>(null)
  useEffect(() => {
    setProblem(location.state.problem)
  })
  return(
    <div className="h-screen w-screen grid grid-cols-[1fr_1fr]">
      {problem?<ProblemDisplay problem={problem}/>:<></>}
      {problem?<CodeEditor problem={problem}/>:<></>}
    </div>
  )
}
