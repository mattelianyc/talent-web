import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // or 'media' based on preference
  theme: {
    extend: {
      colors: {
        // Define custom colors here if needed
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // If you're adding specific dark mode styles:
      typography: (theme: (arg0: string) => any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.white'),
            a: {
              color: theme('colors.white'),
              '&:hover': {
                color: theme('colors.gray.400'),
              },
            },
            // Continue defining elements as needed
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // any other plugins you wish to include
  ],
};

export default config;
