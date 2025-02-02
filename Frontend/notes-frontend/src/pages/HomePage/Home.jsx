import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import NoteCard from "../../components/NoteCard";
import { MdAdd, MdGridOn, MdViewList } from "react-icons/md"; // Added icons for the toggle
import ModifyNotes from "./ModifyNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../other/axiosInstance";
import Toast from "../../components/Toast";
import EmptyCard from "../../components/EmptyCard";

const Home = () => {
  const [openModifyNotes, setOpenModifyNotes] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMessage, setShowToastMessage] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [isGridLayout, setIsGridLayout] = useState(false); // State for layout toggle

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenModifyNotes({ isShown: true, data: noteDetails, type: "edit" });
  };

  const showToastMessage2 = (message, type) => {
    setShowToastMessage({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMessage({
      isShown: false,
      message: ",",
    });
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/");
      }
    }
  };

  const getAllUserNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error has occured.");
    }
  };

  const deleteNote = async (data) => {
    const noteId = data._id;

    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if (response.data && !response.data.error) {
        showToastMessage2("Note Deleted Successfully", "delete");
        getAllUserNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("An unexpected error has occured.");
      }
    }
  };

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(
        "/update-note-pinned/" + noteId,
        {
          isPinned: !noteData.isPinned,
        }
      );

      if (response.data && response.data.note) {
        showToastMessage2("Note Updated Successfully");
        getAllUserNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllUserNotes();
  };

  useEffect(() => {
    getAllUserNotes();
    getUserInfo();
    return () => {};
  }, []);

  return (
    <>
      <NavBar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />

      <div className="container mx-auto">
        {allNotes.length > 0 ? (
          <div
            className={`${
              isGridLayout ? "grid grid-cols-3 gap-4" : "flex flex-col gap-4"
            } mt-8`}
          >
            {allNotes.map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => updateIsPinned(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            message={
              isSearch
                ? "No notes found to your search query."
                : "Click the Add Icon on the bottom right to start adding your notes!"
            }
          />
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenModifyNotes({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <button
        onClick={() => setIsGridLayout(!isGridLayout)}
        className="fixed bottom-10 left-10 w-16 h-16 rounded-2xl bg-primary hover:bg-blue-600 flex items-center justify-center"
      >
        {isGridLayout ? (
          <MdViewList className="text-white" />
        ) : (
          <MdGridOn className="text-white" />
        )}
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
        <ModifyNotes
          type={openModifyNotes.type}
          noteData={openModifyNotes.data}
          onClose={() => {
            setOpenModifyNotes({ isShown: false, type: "add", data: null });
          }}
          getAllUserNotes={getAllUserNotes}
          showToastMessage2={showToastMessage2}
        />
      </Modal>

      <Toast
        isShown={showToastMessage.isShown}
        message={showToastMessage.message}
        type={showToastMessage.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
