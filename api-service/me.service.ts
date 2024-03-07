import { IUsers } from "@/types/users.types";
import { $api } from '@/api/interceptors';

//getUserMe
export const getUserMe = async () => {
  try {
    const response = await $api.get("/users/me");
    return response
  } catch (error) {
    console.log(error);
  }
};

//update
export const updateUserMe  = async (payload:IUsers)=>{
  try{
    const response:any = await $api.patch("users/me",payload)
    return response
  }catch(error){
    console.error(error);
  }
}