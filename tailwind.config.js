module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    // 50: "#fefce8",
                    // 100: "#fef9c3",
                    // // 200: "#fef08a",
                    // 200: "#fdffb6",
                    // 300: "#fde047",
                    // 400: "#facc15",
                    // 500: "#eab308",
                    // 600: "#ca8a04",
                    // 700: "#a16207",
                    // 800: "#854d0e",
                    // 900: "#713f12",
                    // 950: "#422006",
                    50: "#ffffb7",
                    100: "#fff8a5",
                    200: "#fff599",
                    300: "#fff185",
                    400: "#ffee70",
                    500: "#ffec5c",
                    600: "#ffe747",
                    700: "#ffe433",
                    800: "#ffdd1f",
                    900: "#ffda0a",
                },
            },
            animation: {
                blob: "blob 7s infinite",
            },
            keyframes: {
                blob: {
                    "0%": {
                        transform: "translate(0px, 0px) scale(1)",
                    },
                    "33%": {
                        transform: "translate(2rem, -4rem) scale(1.1)",
                    },
                    "50%": {
                        transform: "translate(0, 0.9rem) scale(1.2)",
                    },
                    "66%": {
                        transform: "translate(-1rem, 1rem) scale(0.9)",
                    },
                    "75%": {
                        transform: "translate(-3rem, -2rem) scale(0.8)",
                    },
                    "100%": {
                        transform: "translate(0px, 0px) scale(1)",
                    },
                },
            },
        },
    },
    plugins: [],
};
