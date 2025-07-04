const plugin = require("tailwindcss/plugin");
const flowbiteReact = require("flowbite-react/plugin/tailwindcss");

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
    ".flowbite-react\\class-list.json"
  ],
  theme: {
    extend: {
      colors: {
        primary: { "50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", "300": "#93c5fd", "400": "#60a5fa", "500": "#3b82f6", "600": "#2563eb", "700": "#1d4ed8", "800": "#1e40af", "900": "#1e3a8a", "950": "#172554" },
        brand: "#930433",
        brandLight: "#B65575"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [plugin(({ addVariant, e }) => {
    addVariant("sidebar-expanded", ({ modifySelectors, separator }) => {
      modifySelectors(
        ({ className }) =>
          `.sidebar-expanded .${e(
            `sidebar-expanded${separator}${className}`
          )}`
      );
    });
  }), require('flowbite/plugin'), flowbiteReact],
};

module.exports = config;