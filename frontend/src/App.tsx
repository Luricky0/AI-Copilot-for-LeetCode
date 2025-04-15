import React from 'react'
import ProblemDisplay from './components/ProblemDisplay'
import { sampleProblem } from './data/samples'
import ProblemList from './components/ProblemList'
import LoginPortal from './components/LoginPortal'
import { UserProvider } from './contexts/userContext'

function App() {
  return (
    <>
    <UserProvider>
      <LoginPortal/>
    </UserProvider>
    </>
  )
}

export default App
