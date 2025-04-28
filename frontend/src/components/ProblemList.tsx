import React, { useEffect, useState } from 'react'
import { fetchProblems, Problem } from '../api/problemApi'
import 'font-awesome/css/font-awesome.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { completeProblem, getCompletedProblems, getLikedProblems, likeProblem } from '../api/userApi'

const ProblemList = () => {
  const [problems, setproblems] = useState<Problem[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [likedProblemsIDs, setLikedProblemsIDs] = useState([''])
  const [completedProblemsIDs, setCompletedProblemsIDs] = useState([''])

  const load = async () => {
    try {
      const data = await fetchProblems(page, 50)
      setLikedProblemsIDs(await getLikedProblems())
      setCompletedProblemsIDs(await getCompletedProblems());
      setproblems(data.problems)
    } catch (err) {
      console.error('Error fetching problems:', err)
    } finally {
      setLoading(false)
    }
  }

  const onLike = async (problemId: string) => {
    try {
      await likeProblem(problemId)
      load()
    } catch (error) {
      console.log(error)
    }
  }

  const onComplete = async (problemId: string) => {
    try {
      await completeProblem(problemId)
      load()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    load()
  }, [page])

  if (loading) {
    return <div className="p-4">Loading...</div>
  }

  return (
    <div>
    <h1 className='flex items-center justify-center font-menlo text-4xl py-4'>Codepilot</h1>
    <div className="rounded-lg mx-4 px-4 py-5 border-2 bg-white">
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
          <div className="grid grid-cols-[1fr_1fr] items-center ">
            {likedProblemsIDs?.includes(q._id) ? (
              <i
                className="fa fa-heart text-red-500 fa-2x"
                onClick={() => onLike(q._id)}></i>
            ) : (
              <i
                className="fa fa-heart-o text-red-500 fa-2x"
                onClick={() => onLike(q._id)}></i>
            )}

            {completedProblemsIDs?.includes(q._id) ? (
              <FontAwesomeIcon
                icon={faCheck}
                style={{ color: 'green', fontSize: '2rem' }}
                onClick={() => onComplete(q._id)}
              />
            ) : (
              <FontAwesomeIcon
                icon={faCheck}
                style={{ color: '#dddddd', fontSize: '2rem' }}
                onClick={() => onComplete(q._id)}
              />
            )}
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
  </div>
  )
}

export default ProblemList
