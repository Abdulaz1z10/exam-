"use client"
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { IGuides } from "@/types/guides.types";
import { addGuides, updateGuides } from "@/api-service/guides.service";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 380,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const GuidesModal = ({ open, setOpen,  editGuides, setEditGuides }: any) => {
  const toggle = () => {
    setOpen(false);
    setEditGuides("");
  };
console.log(editGuides)
  const handleModal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let title = formData.get("title") as string;
    let content = formData.get("content") as string;
    let payload: IGuides = {
      title: title ? title : editGuides?.title, 
      content: content ? content : editGuides?.content
    };
    console.log(payload)
    if (editGuides?.title) {
      let data = { payload, _id: editGuides?._id }
      const response = await updateGuides(data)
    } else {
      const response = await addGuides(payload);
    }
    window.location.reload()
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={toggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h1>Add guides</h1>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="flex items-center gap-[50px]">
              <div className="flex flex-col">
                <form
                  onSubmit={handleModal} 
                  className="flex flex-col w-[300px] gap-[10px]"
                >
                  <TextField
                    id="outlined-basic"
                    name="title"
                    label="Title"
                    variant="outlined"
                    defaultValue={editGuides?.title}
                  />
                  <TextField
                    id="outlined-basic"
                    name="content"
                    label="Content"
                    variant="outlined"
                    defaultValue={editGuides?.content}
                  />
                  <button
                    type="submit" 
                    className="p-[10px] rounded-xl hover:bg-green-500 bg-slate-800 text-white"
                  >
                    Add
                  </button>
                </form>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default GuidesModal;
