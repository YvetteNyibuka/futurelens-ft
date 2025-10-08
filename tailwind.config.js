/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nsir: {
          primary: {
            50: "#eef3ff",
            100: "#e0e9ff",
            200: "#c6d7fe",
            300: "#a3bafe",
            400: "#7d92fb",
            500: "#5e6bf6",
            600: "#4b50ea",
            700: "#3d40cf",
            800: "#2159A9", // Main NSIR Primary Color
            900: "#1a237e",
            950: "#12155a",
          },
          secondary: {
            50: "#edfaff",
            100: "#d6f2ff",
            200: "#b5eaff",
            300: "#83dfff",
            400: "#48c9ff",
            500: "#33ABEE", // Main NSIR Secondary Color
            600: "#0ea5e9",
            700: "#0284c7",
            800: "#0369a1",
            900: "#075985",
            950: "#0c4a6e",
          },
        },
        // Aliases for easier use
        "nsir-primary": "#2159A9",
        "nsir-secondary": "#33ABEE",
      },
      backgroundColor: {
        "nsir-primary": "#2159A9",
        "nsir-secondary": "#33ABEE",
        "nsir-primary-50": "#eef3ff",
        "nsir-primary-100": "#e0e9ff",
        "nsir-primary-300": "#a3bafe",
        "nsir-primary-500": "#5e6bf6",
        "nsir-primary-700": "#3d40cf",
        "nsir-secondary-50": "#edfaff",
        "nsir-secondary-100": "#d6f2ff",
        "nsir-secondary-300": "#83dfff",
        "nsir-secondary-500": "#33ABEE",
        "nsir-secondary-700": "#0284c7",
      },
      textColor: {
        "nsir-primary": "#2159A9",
        "nsir-secondary": "#33ABEE",
        "nsir-primary-700": "#3d40cf",
        "nsir-secondary-700": "#0284c7",
      },
      borderColor: {
        "nsir-primary": "#2159A9",
        "nsir-secondary": "#33ABEE",
        "nsir-primary-300": "#a3bafe",
        "nsir-secondary-300": "#83dfff",
      },
      ringColor: {
        "nsir-primary-500": "#5e6bf6",
        "nsir-secondary-500": "#33ABEE",
      },
    },
  },
  plugins: [],
};
