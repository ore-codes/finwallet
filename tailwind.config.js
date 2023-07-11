import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    darkMode: 'class',

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                brand: {
                    100: "#c09be9",
                    200: "#ac79e2",
                    300: "#9758da",
                    400: "#8236d3",
                    500: "#6e28b8",
                    600: "#5a2197",
                    700: "#40186c",
                    800: "#321254",
                    900: "#1e0b32",
                }
            }
        },
    },

    plugins: [forms],
};
