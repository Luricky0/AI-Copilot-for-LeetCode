import React from 'react'
import { Example, Problem } from '../type'

const ExamplesDisplay = ({ examples }: { examples: Example[] }) => {
  return (
    <div className='flex flex-col gap-4'>
      {examples.map((example, index) => {
        return (
          <div>
            <h3 className='font-semibold'>Example {index+1}:</h3>
            <div className='px-4 border-l-2 border-gray'>
            {(Object.keys(example) as Array<keyof Example>).map(key => {
              return(
                <div className='font-medium font-menlo'>
                {key}: 
                  <span className='mx-1 font-normal text-black-55'>
                  {example[key]}
                  </span>
                </div>
              )
            })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
const ConstraintsDisplay=({constraints}:{constraints:string[]})=>{
  return(
    <div>
      <h3 className='font-semibold'>Constraints:</h3>
      <ul className='list-disc'>
        {constraints.map(item=>{
          return(
            <li className='rounded mx-4 my-1 text-sm'>{item}</li>
          )
        })}
      </ul>
    </div>
  )
}
const ProblemDisplay = ({ problem }: { problem: Problem }) => {
  return (
    <div className="rounded-lg m-4 px-4 py-5 border-2 bg-white flex flex-col gap-4">
      <h1 className='text-2xl bold font-bold'>
        {problem.id}. {problem.title}
      </h1>
      <div
        className={`w-12 h-8 flex items-center justify-center font-semibold px-2 py-1 rounded text-white
    ${
      problem.difficulty === 'Easy'
        ? 'bg-green-500'
        : problem.difficulty === 'Medium'
        ? 'bg-yellow-500'
        : 'bg-red-500'
    }`}>
        {problem.difficulty}
      </div>
      <div>{problem.description}</div>
      <ExamplesDisplay examples={problem.examples} />
      <ConstraintsDisplay constraints={problem.constraints}/>
    </div>
  )
}

export default ProblemDisplay
