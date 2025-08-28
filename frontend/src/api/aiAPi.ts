import axiosInstance from '../utils/axiosInstance'

export const getEvaluation = async (
  title: string,
  code: string,
  model = 'deepseek'
) => {
  try {
    const res = await axiosInstance.post('/evaluate', { title, code, model })
    return res
  } catch (error) {
    console.log(error)
  }
}

export const getResultByRequestId = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/request?requestId=${id}`)
    console.log(res)
    return res
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getAnswer = async (
  title: string,
  content: string,
  lang: string,
  model = 'deepseek'
) => {
  try {
    const res = await axiosInstance.post('/answer', {
      title,
      content,
      lang,
      model,
    })
    return res
  } catch (error) {
    console.log(error)
  }
}

export const getAnalyzation = async (
  title: string,
  content: string,
  model = 'deepseek'
) => {
  try {
    const res = await axiosInstance.post('/analyze', { title, content, model })
    return res
  } catch (error) {
    console.log(error)
  }
}
