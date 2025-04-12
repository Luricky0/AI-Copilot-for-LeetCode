export interface Question {
  _id: string
  questionNo: number
  title: string
  acceptance: number
  isPremium: boolean
  difficulty: string
  questionLink: string
  solution: string
}

const BASE_URL = 'http://localhost:8080/api'

const transformQuestion = (dbQuestion: any): Question => {
  return {
    _id: dbQuestion._id,
    questionNo: dbQuestion.Question_No,  // 从数据库字段转换
    title: dbQuestion.Question,
    acceptance: dbQuestion.Acceptance,
    isPremium: dbQuestion.isPremium,
    difficulty: dbQuestion.Difficulty,
    questionLink: dbQuestion.Question_Link,
    solution: dbQuestion.Solution
  };
};

export const fetchQuestions = async (
  page = 1,
  limit = 20
): Promise<{
  questions: Question[]
  totalPages: number
  totalQuestions: number
}> => {
  const res = await fetch(`${BASE_URL}/questions?page=${page}&limit=${limit}`)
  if (!res.ok) {
    throw new Error('Failed to fetch questions')
  }
  
  const data = await res.json();

  const questions = data.questions.map(transformQuestion);

  return {
    questions,
    totalPages: data.totalPages,
    totalQuestions: data.totalQuestions
  };
}
