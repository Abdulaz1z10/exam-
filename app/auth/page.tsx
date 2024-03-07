"use client"
import React from "react";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { PostAuth } from "@/api-service/auth.service";
import Cookies from "js-cookie";

const SignIn = () => {
    const router = useRouter()
    const addAuth = async(formData: FormData)=>{
        let username = formData.get("username")
        let password = formData.get("password")
        let payload = {username, password};
        const response = await PostAuth({...payload})
        if(response?.data?.token){
           Cookies.set("token",response?.data?.token);
             console.log(response)
            if(response?.data?.role === "admin"){
                router.push("/dashboard/users")
            }else if(response?.data?.role === "employee"){
                router.push('/app/userPanel')
            }
        }
    }
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-[30px] my-4">Sign In</h1>
      <form
        action={addAuth}
        className="w-[500px] min-h-96 bg-slate-400 rounded-xl  p-[20px] border-[1px]"
      >
        <TextField
          id="username"
          name="username"
          label="Username"
          variant="outlined"
          className="w-[460px] text-white my-[20px]"
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          variant="outlined"
          className="w-[460px]"
        />
         <button className="w-[200px] p-[10px] bg-slate-900 text-white rounded-xl ml-[28%] mt-[5%]">Sign in</button>
      </form>
    </div>
  );
};

export default SignIn;
