export interface Problem {
  _id: string
  problemNo: number
  title: string
  acceptance: number
  isPremium: boolean
  difficulty: string
  problemLink: string
  solution: string
}

const BASE_URL = 'http://localhost:8080/api'

const transformProblem = (dbproblem: any): Problem => {
  return {
    _id: dbproblem._id,
    problemNo: dbproblem.problem_No, // 从数据库字段转换
    title: dbproblem.problem,
    acceptance: dbproblem.Acceptance,
    isPremium: dbproblem.isPremium,
    difficulty: dbproblem.Difficulty,
    problemLink: dbproblem.problem_Link,
    solution: dbproblem.Solution,
  }
}

export const fetchProblems = async (
  page = 1,
  limit = 20
): Promise<{
  problems: Problem[]
  totalPages: number
  totalproblems: number
}> => {
  const res = await fetch(`${BASE_URL}/problems?page=${page}&limit=${limit}`)
  if (!res.ok) {
    throw new Error('Failed to fetch problems')
  }

  const data = await res.json()

  const problems = data.problems.map(transformProblem)

  return {
    problems,
    totalPages: data.totalPages,
    totalproblems: data.totalproblems,
  }
}
