import axiosInstance from "../utils/axiosInstance"

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

const transformProblem = (dbproblem: any): Problem => {
  return {
    _id: dbproblem._id,
    problemNo: dbproblem.Problem_No, // 从数据库字段转换
    title: dbproblem.Problem,
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
  const res = await axiosInstance.get(`/problems?page=${page}&limit=${limit}`);
  const data = res.data
  const problems = data.problems.map(transformProblem)

  return {
    problems,
    totalPages: data.totalPages,
    totalproblems: data.totalproblems,
  }
}
