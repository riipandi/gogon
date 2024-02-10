import { addDynamicIconSelectors } from "@iconify/tailwind";
import colors from "tailwindcss/colors";
import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["web/**/*!(*.test|*.spec).{js,html}", "internal/**/*.templ"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [...fontFamily.sans],
        mono: [...fontFamily.mono],
      },
      colors: {
        black: "#080808",
        primary: colors.blue,
      },
    },
  },
  // safelist: process.env.NODE_ENV !== "production" ? [{ pattern: /.*/ }] : "",
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    // @ref: https://icon-sets.iconify.design/lucide
    addDynamicIconSelectors({
      iconSets: "lucide",
      prefix: "icon-",
    }),
  ],
};
