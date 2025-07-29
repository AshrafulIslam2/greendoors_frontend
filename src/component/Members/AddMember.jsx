"use client";
import { openModel } from "@/state/helper_slice/modelOpenSlice";
import React from "react";
import { useDispatch } from "react-redux";

function AddMember({ setModalType }) {
  const handleClose = () => {
    // Logic to close the model

    console.log("Model closed");
  };

  const dispatch = useDispatch();
  const handleOpen = () => {
    setModalType("Add New Member");
    dispatch(openModel());
    // Logic to open the model
    console.log("Model opened");
  };
  return (
    <button
      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg shadow hover:scale-105  transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
      onClick={handleOpen}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
      Add Member
    </button>
  );
}

export default AddMember;
