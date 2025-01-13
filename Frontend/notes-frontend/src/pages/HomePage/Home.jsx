import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import NoteCard from "../../components/NoteCard";
import { MdAdd } from "react-icons/md";
import ModifyNotes from "./ModifyNotes";
import Modal from "react-modal";

const Home = () => {
  const [openModifyNotes, setOpenModifyNotes] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  return (
    <>
      <NavBar />

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NoteCard
            title="Testing meeting with UC"
            date="15/01/2025"
            content="Meeting on cloud"
            tags="#meeting"
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </div>
      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenModifyNotes({ isShown: true, type: "add", data: null});
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openModifyNotes.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <ModifyNotes type={openModifyNotes.type} noteData={openModifyNotes.data} onClose={() => {
          setOpenModifyNotes({ isShown: false, type: "add", data: null })
        }} />
      </Modal>
    </>
  );
};

export default Home;
