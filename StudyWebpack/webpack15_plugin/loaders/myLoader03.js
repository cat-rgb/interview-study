module.exports = function (content) {
    console.log("loader3")

    return content + 123
}

module.exports.pitch = function (content) {
    console.log("pitch loader3")
}