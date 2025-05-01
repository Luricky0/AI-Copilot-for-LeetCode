import React, { useState } from 'react'
import ProblemList from '../components/ProblemList'
import UserCard from '../components/UserCard'

const MainPage = () => {
  const [likedProblemsIDs, setLikedProblemsIDs] = useState([])
  const [completedProblemsIDs, setCompletedProblemsIDs] = useState([])
  return (
    <>
      <h1 className="flex items-center font-menlo text-4xl py-4">
        <img src="/logo.png" className="w-10 h-10 mx-2" alt="Logo" />
        Codepilot
      </h1>
      <div className="grid grid-cols-[3fr_1fr] gap-2 mx-2">
        <ProblemList
          likedProblemsIDs={likedProblemsIDs}
          setLikedProblemsIDs={setLikedProblemsIDs}
          completedProblemsIDs={completedProblemsIDs}
          setCompletedProblemsIDs={setCompletedProblemsIDs}
        />
        <UserCard
          likedProblemsIDs={likedProblemsIDs}
          completedProblemsIDs={completedProblemsIDs}
        />
      </div>
    </>
  )
}

export default MainPage
