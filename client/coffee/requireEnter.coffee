require [
    "wire!bootstrap/spec,application/spec"
], (applicationContext) ->
    applicationContext.start()

    console.debug applicationContext.marionetteHooks