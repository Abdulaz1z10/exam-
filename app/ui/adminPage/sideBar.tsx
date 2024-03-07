"use client";
import { Button } from "@mui/material";
import React, { useState } from "react";

export default function Sidebar() {
  const [links, setLinks] = useState([
    { id: 1, path: "/dashboard/users ", title: "Users" },
    { id: 2, path: "/dashboard/guides", title: " Guides" },
    { id: 3, path: "/dashboard/profile", title: "Profile" },
  ]);
  return (
    <div className="h-[100vh] bg-slate-900 fixed w-[300px]	text-white">
      <ul>
        {links.map((item, index) => {
          return (
            <li className="p-[20px] pl-[15%]" key={index}>
              <Button
              variant="contained"
                className="text-white flex flex-col text-2xl no-underline bg-slate-700 p-[20px] w-[200px] mb-[10px]"
                href={item.path}
              >
                {item.title}
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
