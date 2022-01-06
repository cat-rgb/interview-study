module.exports = function (content) {
    console.log("loader2")

    return content + 123
}

module.exports.pitch = function (content) {
    console.log("pitch loader2")
}