const withMT = require("@material-tailwind/react/utils/withMT");
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "rgb(var(--color-primary) / <alpha-value>)",
      secondary: "rgb(var(--color-secondary) / <alpha-value>)",
      background: "rgb(var(--color-background) / <alpha-value>)",
    },
    extend: {},
  },
  plugins: [],
};

const confWithMT = withMT(config);
export default confWithMT;
