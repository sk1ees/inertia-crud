import React, { useState, useEffect } from "react";
import Board from "./Board";

const Kanban = (props) => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    return (
        <div className="h-screen w-full relative bg-skin-base text-skin-base">
            {/* Theme Toggle Button */}
            <button
                onClick={toggleTheme}
                className="absolute top-4 right-12 p-2 flex items-center gap-1 rounded-full shadow-md
                           bg-skin-base text-skin-base"
            >
                <span className="material-symbols-outlined">
                    {isDarkMode ? "dark_mode" : "light_mode"}
                </span>
            </button>

            <Board initialData={props.data} />
        </div>
    );
};

export default Kanban;
