path = require "path"
grunt = require "grunt"

ConnectMW = {}

ConnectMW.folderMount = (connect, point) ->
    return connect.static path.resolve(point)

ConnectMW.stubService = (req, res, next) ->
    if (req.url).match new RegExp("/persons") || (req.url).match new RegExp("/users") || (req.url).match new RegExp("/deals")
        if (req.url).match new RegExp("/persons")
            json = grunt.file.readJSON(require("path").resolve("middleware/response", "persons.json"))
        if (req.url).match new RegExp("/users")
            json = grunt.file.readJSON(require("path").resolve("middleware/response", "user733958.json"))
        if (req.url).match new RegExp("/deals")
            json = grunt.file.readJSON(require("path").resolve("middleware/response", "deals.json"))

        res.setHeader "Content-Type", "application/json; charset=utf-8"
        res.write JSON.stringify(json, 0, 4)
        res.end()
    else
        next()

module.exports = ConnectMW