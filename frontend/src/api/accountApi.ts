import useUser from "../hooks/useUser";
import axiosInstance from "../utils/axiosInstance";
export const fetchLogin = async(userHook:ReturnType<typeof useUser>,{username,password}:{username:string,password:string})=>{
  try{
    const res = await axiosInstance.post('/login',{username,password})
    const {token} = res.data;
    userHook.setToken(token);
    userHook.setUsername(username);
  }catch(err){
    console.error("Error fetch login api.")
    return err;
  }
}

export const fetchRegister = async(userHook:ReturnType<typeof useUser>,{username,password}:{username:string,password:string})=>{
  try{
    const res = await axiosInstance.post('/register',{username,password})
    const {token} = res.data;
    userHook.setToken(token);
    userHook.setUsername(username);
  }catch(err){
    console.error("Error fetch register api.")
    return err;
  }
}