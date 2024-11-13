import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// export const tokens = (mode) => ({
// 	...(mode === "dark"
// 		? {
// 				text: "#F5F5F5",
// 				background: "#101010",
// 				primary: {
// 					main: "#2D81F7",
// 					light: "#3F8FFB",
// 					dark: "#204C92",
// 				},
// 				navbar: {
// 					main: "#1C1C1C",
// 				},
// 				secondary: {
// 					main: "#F77A72",
// 					light: "#FFAEA2",
// 				},
// 				accent: {
// 					main: "#E3C567",
// 				},
// 				neutral: {
// 					light: "#525252",
// 					main: "#424242",
// 					dark: "#303030",
// 				},
// 			}
// 		: {
// 				text: "#1C1C1C",
// 				background: "#F3F9FF",
// 				primary: {
// 					main: "#3A7DE0",
// 					light: "#4C9AF0",
// 					dark: "#2857A0",
// 				},
// 				navbar: {
// 					main: "#4C9AF0", // Sky blue color for a vibrant light mode navbar
// 				},
// 				secondary: {
// 					main: "#F5A623",
// 					light: "#F7B84A",
// 				},
// 				accent: {
// 					main: "#FFBB55",
// 				},
// 				neutral: {
// 					light: "#E0E0E0",
// 					main: "#C2C2C2",
// 					dark: "#8A8A8A",
// 				},
// 			}),
// });

// theme.js
export const tokens = (mode) => ({
	grey: {
		100: "#e0e0e0",
		200: "#c2c2c2",
		300: "#a3a3a3",
		400: "#858585",
		500: "#666666",
		600: "#525252",
		700: "#3d3d3d",
		800: "#292929",
		900: "#141414",
	},
	primary: {
		100: "#d0d1d5",
		200: "#a1a4ab",
		300: "#727681",
		400: "#434957",
		500: "#141b2d",
		600: "#101624",
		700: "#0c101b",
		800: "#080b12",
		900: "#040509",
	},
	custprimary: {
		main: mode === "dark" ? "#141b2d" : "#f3f9ff",
		light: mode === "dark" ? "#3F8FFB" : "#4C9AF0",
		dark: mode === "dark" ? "#101010" : "#2857A0",
	},
	custsecondary: {
		main: mode === "dark" ? "#F77A72" : "#F5A623",
		light: mode === "dark" ? "#FFAEA2" : "#F7B84A",
	},
	greenAccent: {
		100: "#dbf5ee",
		200: "#b7ebde",
		300: "#94e2cd",
		400: "#70d8bd",
		500: "#4cceac",
		600: "#3da58a",
		700: "#2e7c67",
		800: "#1e5245",
		900: "#0f2922",
	},
	redAccent: {
		100: "#f8dcdb",
		200: "#f1b9b7",
		300: "#e99592",
		400: "#e2726e",
		500: "#db4f4a",
		600: "#af3f3b",
		700: "#832f2c",
		800: "#58201e",
		900: "#2c100f",
	},
	blueAccent: {
		100: "#e1e2fe",
		200: "#c3c6fd",
		300: "#a4a9fc",
		400: "#868dfb",
		500: "#6870fa",
		600: "#535ac8",
		700: "#3e4396",
		800: "#2a2d64",
		900: "#151632",
	},
	text: mode === "dark" ? "#F5F5F5" : "#1C1C1C",
	background: mode === "dark" ? "#101010" : "#F3F9FF",
	navbar: {
		main: mode === "dark" ? "#1C1C1C" : "#4C9AF0",
	},
	accent: {
		main: mode === "dark" ? "#E3C567" : "#FFBB55",
	},
	neutral: {
		light: mode === "dark" ? "#525252" : "#E0E0E0",
		main: mode === "dark" ? "#424242" : "#C2C2C2",
		dark: mode === "dark" ? "#303030" : "#8A8A8A",
	},
	sectionBackground: mode === "dark" ? "#7b7b7b" : "#fefffd", // Dark gray for dark mode, white for light mode
});

export const themeSettings = (mode) => {
	const colors = tokens(mode);
	return {
		palette: {
			mode,
			primary: {
				main: colors.primary[100],
				dark: colors.primary[200],
			},
			secondary: {
				main: colors.greenAccent[500],
			},
			custprimary: {
				main: colors.custprimary.main,
				light: colors.custprimary.light,
				dark: colors.custprimary.dark,
			},
			custsecondary: {
				main: colors.custsecondary.main,
				light: colors.custsecondary.light,
			},
			accent: {
				main: colors.accent.main,
			},
			neutral: {
				light: colors.neutral.light,
				main: colors.neutral.main,
				dark: colors.neutral.dark,
			},
			background: {
				default: colors.background,
			},
			text: {
				primary: colors.text,
			},
			navbar: {
				main: colors.navbar.main,
			},
			navbarText: {
				main: mode === "dark" ? colors.text : "#1C1C1C",
			},
			sectionBackground: {
				main: colors.sectionBackground,
			},
		},
		typography: {
			fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
			fontSize: 12,
			h1: {
				fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
				fontSize: 40,
			},
			h2: {
				fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
				fontSize: 32,
			},
			h3: {
				fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
				fontSize: 24,
			},
			h4: {
				fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
				fontSize: 20,
			},
			h5: {
				fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
				fontSize: 16,
			},
			h6: {
				fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
				fontSize: 14,
			},
		},
	};
};

// Context for managing and toggling the display mode (light/dark)
export const DisplayModeContext = createContext({
	toggleDisplayMode: () => {},
});

// Custom hook to provide the theme and toggle functionality
export const useMode = () => {
	const [mode, setMode] = useState("light");

	const colorMode = useMemo(
		() => ({
			toggleDisplayMode: () =>
				setMode((prevMode) =>
					prevMode === "light" ? "dark" : "light"
				),
		}),
		[]
	);

	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

	return [theme, colorMode];
};
