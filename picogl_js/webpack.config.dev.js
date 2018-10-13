module.exports = {
    entry: "./src/picogl.js",
    output: {
        library: "PicoGL",
        filename: "build/picogl.js",
        libraryTarget: "var"
    },
    devtool: "source-map"
};
