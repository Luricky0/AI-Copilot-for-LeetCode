import React, { useEffect, useState } from 'react'
import { fetchProblems, Problem } from '../api/problemApi'
import 'font-awesome/css/font-awesome.min.css'
import { getLikedProblems } from '../api/userApi'
import { ObjectId } from 'mongoose'

const ProblemList = () => {
  const [problems, setproblems] = useState<Problem[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  let likedProblemsIDs: string[]

  const load = async () => {
    try {
      const data = await fetchProblems(page, 50)
      likedProblemsIDs = await getLikedProblems()
      setproblems(data.problems)
    } catch (err) {
      console.error('Error fetching problems:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [page])

  if (loading) {
    return <div className="p-4">Loading...</div>
  }
  console.log('111', problems)

  return (
    <div className="rounded-lg m-4 px-4 py-5 border-2 bg-white">
      <h2 className="text-xl font-bold">Problems</h2>
      <div className="p-3 grid grid-cols-[8fr_1fr_1fr] gap-4 border-b border-black-08 text-black-55">
        <div>Title</div>
        <div>Difficulty</div>
        <div>Actions</div> {/* New Actions column */}
      </div>
      {problems.map((q) => (
        <div
          key={q._id}
          className={`p-2 grid grid-cols-[8fr_1fr_1fr] gap-4 items-center 
            ${q.problemNo % 2 === 0 ? 'bg-white-dark' : 'bg-white'}`}>
          <a href={q.problemLink} target="_blank" rel="noopener noreferrer">
            {q.problemNo}. {q.title}
          </a>
          <div
            className={`font-semibold text-sm
            ${
              q.difficulty === 'Easy'
                ? 'text-green-500'
                : q.difficulty === 'Medium'
                ? 'text-yellow-500'
                : 'text-red-500'
            }`}>
            {q.difficulty}
          </div>
          <i className="fa fa-heart-o text-red-500 fa-2x "></i>
        </div>
      ))}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-black-08 rounded disabled:opacity-50">
          Last
        </button>
        <span className="text-gray-600">Page {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-black-08 rounded">
          Next
        </button>
      </div>
    </div>
  )
}

export default ProblemList
