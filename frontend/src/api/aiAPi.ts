import axiosInstance from '../utils/axiosInstance'

export const getEvaluation = (title: string, code: string) => {
  try {
    const res = axiosInstance.post('/evaluate', { title, code })
    return res
  } catch (error) {
    console.log(error)
  }
}
