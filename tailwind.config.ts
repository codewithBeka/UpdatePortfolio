import type { PluginAPI, Config } from "tailwindcss/types/config";

const svgToDataUri = require("mini-svg-data-uri");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        black: {
          DEFAULT: "#000",
          100: "#000319",
          200: "rgba(17, 25, 40, 0.75)",
          300: "rgba(255, 255, 255, 0.125)",
          500: '#3A3A49',
        },
        white: {
          DEFAULT: "#FFF",
          100: "#BEC1DD",
          200: "#C1C2D3",
          500: '#62646C',
          600: '#AFB0B6',
          800: '#E4E4E6',
        },
        blue: {
          100: "#E4ECFF",
        },
        backgroundImage: {
          "radial-gradient": "radial-gradient(var(--tw-gradient-stops))",
          "conic-gradient":
            "conic-gradient(from 225deg, #FFC876, #79FFF7, #9F53FF, #FF98E2, #FFC876)",
        },
        purple: "#CBACF9",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
        moveHorizontal: {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        moveInCircle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        moveVertical: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
      },
      animation: {
        "meteor-effect": "meteor 5s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        spotlight: "spotlight 2s ease .75s 1 forwards",
        shimmer: "shimmer 2s linear infinite",
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      
      typography: ({ theme }: PluginAPI) => ({
    
        dark: {
          css: {
            color: theme('colors.white.DEFAULT'), // Dark mode text color
            fontFamily: (theme?.('fontFamily.sans') || []).join(', '),
            fontSize: '1rem', // Default font size
            lineHeight: '1.6', // Default line height
            a: {
              color: theme('colors.blue.100'),
              '&:hover': {
                color: theme('colors.blue.200'),
              },
            },
            strong: {
              color: theme('colors.white.DEFAULT'), // Strong text color
              fontWeight: '600', // Make it bold
            },
            h1: {
              color: theme('colors.white.DEFAULT'),
              fontSize: '2.25rem',
              fontWeight: '700',
              lineHeight: '1.5',
            },
            h2: {
              color: theme('colors.white.DEFAULT'),
              fontSize: '1.875rem',
              fontWeight: '600',
              lineHeight: '1.5',
            },
            h3: {
              color: theme('colors.white.DEFAULT'),
              fontSize: '1.625rem',
              fontWeight: '600',
              lineHeight: '1.5',
            },
            h4: {
              color: theme('colors.white.DEFAULT'),
              fontSize: '1.5rem',
              fontWeight: '600',
              lineHeight: '1.5',
            },
            h5: {
              color: theme('colors.white.DEFAULT'),
              fontSize: '1.25rem',
              fontWeight: '600',
              lineHeight: '1.5',
            },
            h6: {
              color: theme('colors.white.DEFAULT'),
              fontSize: '1rem',
              fontWeight: '600',
              lineHeight: '1.5',
            },
            p: {
              color: theme('colors.white.DEFAULT'),
              fontFamily: (theme?.('fontFamily.sans') || []).join(', '),
              lineHeight: '1.6',
              marginBottom: '1rem',
            },
            ul: {
              color: theme('colors.white.DEFAULT'),
              paddingLeft: '1.5rem',
              '& li': {
                marginBottom: '0.5rem',
                position: 'relative', // Position for custom marker
                paddingLeft: '1.25rem', // Space for custom marker
                '&::marker': {
                  color: theme('colors.purple.DEFAULT'), // Marker color
                  fontFamily: (theme?.('fontFamily.sans') || []).join(', '),
                },
              },
            },
            ol: {
              color: theme('colors.white.DEFAULT'),
              paddingLeft: '1.5rem',
              '& li': {
                marginBottom: '0.5rem',
                position: 'relative', // Position for custom marker
                paddingLeft: '1.25rem', // Space for custom marker
                '&::marker': {
                  color: theme('colors.purple.DEFAULT'), // Marker color
                },
              },
            },
            blockquote: {
              color: theme('colors.white.DEFAULT'),
              borderLeftColor: theme('colors.purple.DEFAULT'),
              borderLeftWidth: '4px',
              paddingLeft: '1rem',
              fontStyle: 'italic',
              marginBottom: '1rem',
            },
            hr: {
              borderColor: theme('colors.purple.DEFAULT'),
              margin: '1.5rem 0',
            },
            table: {
              width: '100%',
              borderCollapse: 'collapse',
              color: theme('colors.white.DEFAULT'),
              th: {
                backgroundColor: theme('colors.purple.DEFAULT'),
                color: theme('colors.white.DEFAULT'),
                padding: '0.75rem',
                textAlign: 'left',
                borderBottom: `2px solid ${theme('colors.white.DEFAULT')}`,
              },
              td: {
                padding: '0.75rem',
                borderBottom: `1px solid ${theme('colors.white.DEFAULT')}`,
              },
            },
          
          },
        },
      }),
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    addVariablesForColors,
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-grid": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100" height="100" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;