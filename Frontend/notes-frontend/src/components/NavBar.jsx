import React, { useState } from "react";
import ProfileInfoCard from "./ProfileInfoCard";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const NavBar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [userSearchQuery, setUserSearchQuery] = useState("");

  const nav = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    nav("/");
  };

  const handleSearch = () => {
    if(userSearchQuery) {
      onSearchNote(userSearchQuery)
    }
    
  };

  const onClearSearch = () => {
    setUserSearchQuery("");
    handleClearSearch()
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>

      <SearchBar
        value={userSearchQuery}
        onChange={({ target }) => {
          setUserSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      <ProfileInfoCard userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default NavBar;
