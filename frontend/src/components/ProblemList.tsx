import React, { useEffect, useState } from 'react'
import { fetchQuestions, Question } from '../api/questionApi'

const ProblemList = () => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      const data = await fetchQuestions(page, 50)
      setQuestions(data.questions)
    } catch (err) {
      console.error('❌ Error fetching questions:', err)
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
  console.log('111', questions)

  return (
    <div className="rounded-lg m-4 px-4 py-5 border-2 bg-white flex flex-col">
      <h2 className="text-xl font-bold">Questions</h2>
      <div className="p-3 flex items-center justify-between border-b border-black-08 text-black-55">
        <div>Title</div>
        <div>Difficulty</div>
      </div>
      {questions.map((q) => (
        <div
          key={q._id}
          className={`p-2 flex items-center justify-between 
      ${q.questionNo % 2 === 0 ? 'bg-white-dark' : 'bg-white'}`}>
          <a href={q.questionLink} target="_blank" rel="noopener noreferrer">
            {q.questionNo}. {q.title}
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
