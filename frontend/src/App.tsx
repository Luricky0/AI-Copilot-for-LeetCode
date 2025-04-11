import React from 'react'
import ProblemDisplay from './components/ProblemDisplay'
import { sampleProblem } from './data/samples'

function App() {
  return (
    <>
      <ProblemDisplay problem={sampleProblem} />
    </>
  )
}

export default App
