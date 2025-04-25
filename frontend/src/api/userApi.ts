import axiosInstance from "../utils/axiosInstance"

export const getLikedProblems = async() =>{
  try{
    const res = await axiosInstance.get('/liked');
    return res.data.likedProblemsIDs
  }catch(error){
    console.log(error)
  }
}