/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        apercuMed: ['"Apercu Pro Medium"', "sans-serif"]
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        deepteal: "#51829B",
        eggshell: "#f9f9f9",
        theorange: "#F6995C",
        darkerorange: "#FF9D3D",
        paleyellow: "#EADFB4",
        smokyblue: "9BB0C1"
      },
    },
  },
  plugins: [],
};
