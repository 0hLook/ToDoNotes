import React, { useState } from "react";
import ProfileInfoCard from "./ProfileInfoCard";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const Cl = () => {
  const [userSearchQuery, setUserSearchQuery] = useState("");

  const nav = useNavigate;

  const onLogout = () => {
    nav("/login");
  };

  const handleSearch = () => {
    
  };

  const onClearSearch = () => {
    setUserSearchQuery("");
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

      <ProfileInfoCard onLogout={onLogout} />
    </div>
  );
};

export default Cl;
