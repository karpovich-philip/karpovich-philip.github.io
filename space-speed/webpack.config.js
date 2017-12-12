module.exports = {
    entry:  "./src/js/common.js",
    output: {
        path: __dirname + "/src/dist",
        filename: "script.js"
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    }
}
