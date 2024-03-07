import { $api } from "@/api/interceptors";
import { IUsers } from "@/types/users.types";

//create
export const createUsers =async(data: IUsers)=>{
    try {
        const response = await $api.post("/users", data)
        console.log(response)
        return response.data
    } catch (error) {
        console.log(error, "error")
    }
}

//upload
export const getUsers = async(data: IUsers)=>{
    try{
        const response = await $api.get("/users?page%5Boffset%5D=0&page%5Blimit%5D=20&sort%5Bby%5D=id&sort%5Border%5D=desc&filters%5Brole%5D=admin")
        console.log(response.data)
        return response?.data
    }catch(error){
        console.log(error, "error")
    }
}

//update
export const updateUsers =async(data: any)=>{
    try {
        const response = await $api.patch(`/users${data.payload}`, data._id)
        console.log(response)
    } catch (error) {
        console.log(error, "error")
    }
}

//delete
export const deleteUsers =async(data: any)=>{
    try {
        const response = await $api.delete(`/users/${data}`)
        console.log(response)
    } catch (error) {
        console.log(error, "error")
    }
}