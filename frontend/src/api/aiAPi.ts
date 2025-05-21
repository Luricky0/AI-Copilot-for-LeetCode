import axiosInstance from '../utils/axiosInstance'

export const getEvaluation = (title: string, code: string) => {
  try {
    const res = axiosInstance.post('/evaluate', { title, code })
    return res
  } catch (error) {
    console.log(error)
  }
}

export const getAnswer = (title: string, content: string, lang: string) => {
  try {
    const res = axiosInstance.post('/answer', { title, content, lang })
    return res
  } catch (error) {
    console.log(error)
  }
}

export const getAnalyzation = (title: string, content: string) => {
  try {
    const res = axiosInstance.post('/analyze', { title, content })
    return res
  } catch (error) {
    console.log(error)
  }
}
