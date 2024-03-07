"use client"
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import UsersModal from "../usersModal/usersModal";
import { deleteUsers, getUsers } from "@/api-service/users.service";
import { updateUsers } from "./../../../api-service/users.service";

const Users = () => {
  const [modal, setModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState(""); 

  const openModal = () => {
    setModal(true);
  };

  const toggle = () => {
    setModal(false);
    setEdit("");
  };

  const fetchData = async () => {
    const data = await getUsers();
    setUsers(data?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateUser = (id) => {
    setEdit(id);
    setModal(true);
  };

  const handleDelete = async (id) => {
    await deleteUsers(id);
    fetchData();
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const Users = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
      <UsersModal open={modal} toggle={setModal} value={edit} />
      <div className="flex justify-between py-[1%] items-center mr-[5%]">
        <Button
          variant="contained"
          onClick={openModal}
          className=" mt-[1%] bg-slate-500"
        >
          Add users
        </Button>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search users..."
          className=" w-[250px] border-[2px] rounded-xl p-[10px]"
        />
      </div>
      <div className="flex flex-wrap gap-[10px]">
        {Users.map((item, index) => (
          <div
            key={index}
            className="rounded-xl flex flex-col justify-between w-[250px] border  bg-white p-[10px]"
          >
            <h4 className="text-[15px] ml-[10px]">Name: {item.first_name}</h4>
            <h4 className="text-[15px] ml-[10px]">
              Last name: {item.last_name}
            </h4>
            <img
              src={`http://localhost:8080/${item.avatar}`}
              className=" rounded-xl w-[240px] h-[250px] "
              alt=""
            />
            <h4 className="text-[15px] ml-[10px]">Avatar: {item.avatar}</h4>
            <h4 className="text-[15px] ml-[10px]">Age: {item.age}</h4>
            <h4 className="text-[15px] ml-[10px]">Role: {item.role}</h4>
            <h4 className="text-[15px] ml-[10px]">User: {item.username}</h4>
            <h4 className="text-[15px] ml-[10px]">Desc: {item.description}</h4>
            <div className="flex justify-around bottom-0">
              <button
                onClick={() => updateUser(item)}
                className="w-[100px] bg-sky-600 p-[10px] text-white rounded-xl"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item?._id)}
                className="w-[100px] bg-red-500 p-[10px] text-white rounded-xl"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-[12%] justify-center w-[79%] absolute bottom-0 align-center mb-[50px]">
        {Array.from({
          length: Math.ceil(filteredUsers.length / usersPerPage),
        }).map((_, index) => (
          <Button
            variant="contained"
            key={index}
            className="mr-2 px-4 py-2 bg-slate-500 rounded"
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Users;
