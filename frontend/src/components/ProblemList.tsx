import React, { useEffect, useState } from 'react'
import { fetchProblems, Problem } from '../api/problemApi'

const ProblemList = () => {
  const [problems, setproblems] = useState<Problem[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      const data = await fetchProblems(page, 50)
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
    <div className="rounded-lg m-4 px-4 py-5 border-2 bg-white flex flex-col">
      <h2 className="text-xl font-bold">Problems</h2>
      <div className="p-3 flex items-center justify-between border-b border-black-08 text-black-55">
        <div>Title</div>
        <div>Difficulty</div>
      </div>
      {problems.map((q) => (
        <div
          key={q._id}
          className={`p-2 flex items-center justify-between 
      ${q.problemNo % 2 === 0 ? 'bg-white-dark' : 'bg-white'}`}>
          <a href={q.problemLink} target="_blank" rel="noopener noreferrer">
            {q.problemNo}. {q.title}
          </a>
          <div
            className={`mx-2 font-semibold text-sm
          ${
            q.difficulty === 'Easy'
              ? 'text-green-500'
              : q.difficulty === 'Medium'
              ? 'text-yellow-500'
              : 'text-red-500'
          }`}>
            {q.difficulty}
          </div>
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
