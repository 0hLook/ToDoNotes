import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const LoginSignUpHeader = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

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

  return (
    <div className="bg-white dark:bg-gray-800 flex items-center justify-between px-6 py-2">
      <h2 className="text-xl font-medium text-black dark:text-white py-2">
        Take Notes!
      </h2>

      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white transition"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  );
};

export default LoginSignUpHeader;
