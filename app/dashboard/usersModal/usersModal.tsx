"use client";
import  React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import { $api } from "@/api/interceptors";
import { IUsers } from "@/types/users.types";
import { createUsers, updateUsers, getUsers} from '@/api-service/users.service';

const UsersModal = ({open, toggle, value}: { open: boolean; toggle: () => void;}) => {
  const [file, setFile] = useState(""); 
  const [user, setUser] = useState(""); 

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

const handleFileChange =async(e:any)=>{
  e.preventDefault()
    const file =   e.target.files[0]
    const form = new FormData()
    form.append('file', file as Blob)
    const respons = await $api.post('/upload', form)
    console.log(respons?.data?.path)
    setFile(respons?.data?.path)
 }

  const handleModal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let first_name = formData.get("first_name") as string;
    let last_name = formData.get("last_name") as string;
    let age = Number(formData.get("age"));
    let role = "employee"; 
    let username = formData.get("username") as string;
    let password = formData.get("password") as string;
    let description = formData.get("description") as string;
let payload: IUsers ={
  avatar: file ? file : value?.avatar,
  first_name: first_name ? first_name : value?.first_name,
  age: age ? age : value?.age,
  last_name: last_name ? last_name : value?.last_name,
  role: role ? role : value?.role,
  username: username ? username : value?.username,
  password: password ? password : value?.password,
  description: description ? description : value?.description
}

    if(value?.first_name){
      let data = {_id:value?._id,payload}
      const response =await updateUsers(data)
    }else{
      const response = await createUsers(payload);
      console.log(response, "vbn")
      if(response?.status === 201) {
        window.location.reload()
      }
    }
  };
  const close = () => {
    toggle(false)
  }
  return (
    <div className="flex">
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h1 className="text-4xl font-bold" >Add user</h1>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="flex items-center gap-[50px]">
              <div className="flex flex-col items-center relative">
                <Image
                  src="/upload.jpg"
                  width={270}
                  height={270}
                  alt="image"
                />
                <input defaultValue={value?.image} type="file" onChange={handleFileChange} className="w-[100%] h-[100%] absolute opacity-0 top-0" />
              </div>
              <div className="flex flex-col">
                <form
                  onSubmit={handleModal}
                  className="flex flex-col w-[300px] gap-[10px]"
                >
                  {" "}
                  <TextField defaultValue={value?.first_name} id="outlined-basic" name="first_name"label="Firstname" variant="outlined" />
                  <TextField defaultValue={value?.last_name}  id="outlined-basic" name="last_name" label="Lastname" variant="outlined" />
                  <input defaultValue={value?.age} type="number"    className="border-[#a7a5a5] border-[1px] p-[13px] rounded-sm outline-none"  name="age"  placeholder="number" />
                  <select defaultValue={value?.role} name="role"   className="border-[#a7a5a5] border-[1px] p-[13px] rounded-sm outline-none" >
                    {" "}
                    <option value="employee">Employee</option>{" "}
                  </select>
                  <TextField defaultValue={value?.username} id="outlined-basic"  name="username"label="username" variant="outlined"
                  />
                  <TextField defaultValue={value?.password} id="outlined-basic"  name="password"label="password" variant="outlined"
                  />
                  <TextField defaultValue={value?.description} id="outlined-basic"  name="description"label="Description" variant="outlined"
                  />
                  <Button type="submit" variant="contained" className="mt-4 bg-slate-600">
                    Submit
                  </Button>{" "}
                </form>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default UsersModal;
