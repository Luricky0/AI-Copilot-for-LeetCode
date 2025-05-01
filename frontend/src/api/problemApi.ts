import axiosInstance from '../utils/axiosInstance'

interface TopicTag {
  name: string
  slug: string
}

export interface Problem extends Document {
  _id: string
  problemId: string
  title: string
  content: string
  difficulty: string
  likes: number
  dislikes: number
  exampleTestcases: string
  codeSnippets: { lang: string; code: string }[]
  topicTags: TopicTag[]
  stats: {
    totalAccepted: string
    totalSubmission: string
    totalAcceptedRaw: number
    totalSubmissionRaw: number
    acRate: string
  }
  hints: string[]
}

export const fetchProblems = async (
  page = 1,
  limit = 20,
  searchQuery = '',
  difficultyFilter = 'All'
): Promise<{
  problems: Problem[]
  totalPages: number
  totalproblems: number
}> => {
  const res = await axiosInstance.get('/problems', {
    params: {
      page,
      limit,
      search: searchQuery || undefined,
      difficulty: difficultyFilter !== 'All' ? difficultyFilter : undefined,
    },
  })
  const data = res.data
  const problems = data.problems

  return {
    problems,
    totalPages: data.totalPages,
    totalproblems: data.totalproblems,
  }
}
