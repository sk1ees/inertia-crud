import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                grape: "var(--grape)",
            },
            backgroundColor: {
                skin: {
                    base: "var(--bg-color)",
                    card: "var(--card-color)",
                    hover: "var(--hover-color)",
                },
            },
            textColor: {
                skin: {
                    base: "var(--text-color)",
                },
            },
        },
    },

    plugins: [forms],
};
