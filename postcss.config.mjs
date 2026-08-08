/** @type {import('postcss-load-config').Config} */
const config = {
    plugins: {
        "@csstools/postcss-global-data": {
            files: ["./src/styles/variables/breakpoints.css"],
        },
        "postcss-custom-media": {},
    },
};

export default config;
