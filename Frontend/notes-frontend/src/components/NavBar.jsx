import React, { useState, useEffect } from "react";
import ProfileInfoCard from "./ProfileInfoCard";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Sun, Moon } from "lucide-react"; // Install Lucide React icons if needed

const NavBar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const nav = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const onLogout = () => {
    localStorage.clear();
    nav("/");
  };

  const handleSearch = () => {
    if (userSearchQuery.trim()) {
      onSearchNote(userSearchQuery.trim());
    }
  };

  const onClearSearch = () => {
    setUserSearchQuery("");
    handleClearSearch();
  };

  return (
    <div className="bg-white dark:bg-gray-800 flex items-center justify-between px-6 py-2 shadow-md">
      <h2 className="text-xl mr-2 font-medium text-black dark:text-white py-2">
        Notes
      </h2>

      <SearchBar
        value={userSearchQuery}
        onChange={({ target }) => setUserSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      <div className="flex items-center gap-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 ml-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white transition"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <ProfileInfoCard userInfo={userInfo} onLogout={onLogout} />
      </div>
    </div>
  );
};

export default NavBar;
