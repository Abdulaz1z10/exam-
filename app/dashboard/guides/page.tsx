"use client"
import React, { useEffect, useState } from "react";
import GuidesModal from "../usersModal/guidesModal";
import Button from "@mui/material/Button";
import { MdEdit, MdDelete } from "react-icons/md";
import { IGuides } from "@/types/guides.types";
import { deleteGuides, getGuides } from "@/api-service/guides.service";

const Guides = () => {
  const [open, setOpen] = useState(false);
  const [guides, setGuides] = useState<IGuides[]>([]);
  const [editGuides, setEditGuides] = useState<IGuides>();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); 

  const GetGuides = async () => {
    const response = await getGuides();
    setGuides(response?.data?.data);
  };

  useEffect(() => {
    GetGuides();
  }, []);

  const deleteModal = async (id: number) => {
    await deleteGuides(id);
    GetGuides(); 
  };

  console.log(editGuides)
  const editModal = (item) => {
    setEditGuides(item);
    setOpen(true);
  };

  // Filter guides based on search query
  const filteredGuides = guides.filter((guide: IGuides) =>
    guide.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const Guides = filteredGuides.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber:any) => setCurrentPage(pageNumber);

  return (
    <div >
      <div className="sticky z-30 top-0">
      </div>
      <div className="flex">
        <GuidesModal
          open={open}
          setOpen={setOpen}
          editGuides={editGuides}
          setEditGuides={setEditGuides}
        />
        <div>
          <div className="flex justify-between py-[1%] items-center mr-[5%]"> 
            <Button
            variant="contained"
            className="ml-[5%]  bg-slate-500"
            onClick={() => setOpen(true)}
          >
            Add guides
          </Button>
        <input
        className="w-[250px] border-[2px] rounded-xl p-[10px]"
          type="text"
          placeholder="Search guides..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
          </div>
          <div className="w-[79vw] flex flex-wrap justify-between p-[10px] gap-[20px] ">
            {Guides.map((item: any, index) => {
              return (
                <div
                  key={index}
                  className="w-[300px] p-[15px] rounded-xl border flex flex-col gap-[20px] bg-white"
                >
                  <div className="flex gap-[10px]">
                    <button
                      className="flex gap-[10px] text-[18px] border text-[red] hover:bg-red-600 hover:text-[white] p-[7px] rounded-3xl transition-all"
                      onClick={() => deleteModal(item._id)}
                    >Delete<MdDelete /> 
                    </button>
                    <button
                      className=" flex text-[18px] gap-[10px] border text-[blue] hover:bg-blue-600 hover:text-[white] p-[7px] rounded-3xl transition-all"
                      onClick={() => editModal(item)}
                    >Edit<MdEdit /> 
                    </button>
                  </div>
                  <h1 className="text-[25px] text-center">Qoidalar</h1>
                  <h1>{item.title}</h1>
                  <h1>{item.content}</h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>
            <div className="flex mt-[12%] justify-center w-[79%] absolute bottom-0 align-center mb-[50px]">
            {Array.from({length: Math.ceil(filteredGuides.length / itemsPerPage)}).fill(0).map((_, index) => (
                <Button className="mr-2 px-4 py-2 bg-slate-500 rounded"  variant="contained" key={index} onClick={() => paginate(index + 1)}>
                  {index + 1}
                </Button>
              ))}
          </div>
    </div>
  );
};

export default Guides;
