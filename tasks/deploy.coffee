When = require("when")
exec = require("child_process").exec

runBushCommands = (command) ->
    deferred = When.defer()
    console.log "RUN ", command
    exec command, (err) ->
        if err
            console.log "ERROR: ", err
            deferred.reject(err)
        else
            deferred.resolve()
    return deferred.promise

module.exports = (grunt) ->
    grunt.registerTask "deployToRemote", "deploy master to remote origin", (branch) ->
        console.log "BRANCH", branch
        done = @async()

        bashCommands = [
            "git merge dev"
            "grunt build"
            "git add ."
            "git commit -m 'build (timestamp)'"
            "git push origin #{branch}"
        ]

        runBushCommands(bashCommands.join(' && ')).done =>
            done()