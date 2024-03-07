"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MdEdit } from "react-icons/md";
import MeModal from "../usersModal/meModal";
import { IUserMe } from "@/types/me.types";
import { getUserMe } from "@/api-service/me.service";

const Profile = () => {
  const [userMe, setUserMe] = useState<IUserMe>();
  const [open, setOpen] = useState(false);
  const userAdmin = async () => {
    const response = await getUserMe();
    setUserMe(response?.data?.data);
  };
  useEffect(() => {
    userAdmin();
  }, []);
  return (
    <div>
      <MeModal setOpen={setOpen} open={open} modalOpen={userMe} />
      <div className="flex w-[80%] ml-[8%] border-[2px] rounded-md mt-[8%] items-center">
        <div className="flex justify-center">
          <div className="flex  w-[100%] p-[15px] h-[450px]  gap-[50px] border-[white] bg-white rounded-xl border-[2px]">
            <div>
              <h1 className="text-[30px] font-[500]">Shaxsiy ma'lumot</h1>
              <Image
                src={"/image.png"}
                width={250}
                height={250}
                alt="image"
                className="rounded-[50%] h-[250px] mt-[50px]"
              />
              <div className="flex">
              <button onClick={() => setOpen(true)}>
                <MdEdit className="text-[25px] mt-[30px] hover:text-[gray]" /> 
                Edit Profile
              </button>
              </div>
            </div>
            <div className="flex justify-center mt-[100px] gap-[170px]">
              <div className="flex flex-col">
                <h1>Ism</h1>
                <h1 className="text-[25px]">{userMe?.first_name}</h1>
                <h1 className="mt-[30px]">Phone number:</h1>
                <h1 className="text-[20px]">(+998)93 542-24-77</h1>
                <h1 className="mt-[30px]">Role</h1>
                <h1>{userMe?.role}</h1>
              </div>
              <div className="flex flex-col">
                <h1>Familiya</h1>
                <h1 className="text-[25px] ">{userMe?.last_name}</h1>
                <h1 className="mt-[30px]">Birth Date</h1>
                <h1 className="text-[20px]">10.03.2005</h1>
                <h1 className="mt-[30px]">User ID</h1>
                <h1>{userMe?._id}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;