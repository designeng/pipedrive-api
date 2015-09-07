path = require "path"
grunt = require "grunt"

sendResult = (res, json) ->
    res.setHeader "Content-Type", "application/json; charset=utf-8"
    res.write JSON.stringify(json, 0, 4)
    res.end()

ConnectMW = {}

ConnectMW.folderMount = (connect, point) ->
    return connect.static path.resolve(point)

# TODO: optimize and fix
ConnectMW.stubService = (req, res, next) ->
    if (req.url).match new RegExp("/persons") || (req.url).match new RegExp("/users") || (req.url).match new RegExp("/deals") || (req.url).match new RegExp("/stages") || (req.url).match new RegExp("/persons/[0-9]+/deals")
        if (req.url).match new RegExp("/persons")
            return sendResult res, grunt.file.readJSON(require("path").resolve("middleware/response", "persons.json"))
        if (req.url).match new RegExp("/users")
            return sendResult res, grunt.file.readJSON(require("path").resolve("middleware/response", "user733958.json"))
        if (req.url).match new RegExp("/persons/[0-9]+/deals")
            return sendResult res, grunt.file.readJSON(require("path").resolve("middleware/response", "deals.json"))
        if (req.url).match new RegExp("/stages")
            return sendResult res, grunt.file.readJSON(require("path").resolve("middleware/response", "stages.json"))
        if (req.url).match new RegExp("/deals")
            return sendResult res, grunt.file.readJSON(require("path").resolve("middleware/response", "allDeals.json"))
    else
        next()

module.exports = ConnectMW