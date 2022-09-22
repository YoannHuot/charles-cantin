/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		colors: {
			primary: "#47555E",
			secondary: "#4A7086",
			light: "#F1FBFF",
			"light-green": "#D3FBD8",
			"app-pink": "#FF006E",
			"app-orange": "#FB5607",
			"app-yellow": "#FFBE0B",
			"app-blue": "#3A86FF",
			"app-purple": "#8338EC",
		},
		fontFamily: {
			lato: ["lato"],
			latoBold: ["latoBold"],
			latoThin: ["latoThin"],
			latoBlack: ["latoBlack"],
			rosario: ["rosario"],
			rosarioBold: ["rosarioBold"],
			rosarioItalic: ["rosarioItalic"],
			rosarioBoldItalic: ["rosarioBoldItalic"],
			suraBold: ["suraBold"],
			suraRegular: ["suraRegular"],
		},
		screens: {
			xs: "425px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		},

		extend: {},
	},
	plugins: [],
};
