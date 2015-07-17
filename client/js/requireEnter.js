require(["wire!bootstrap/spec,application/spec"], function(applicationContext) {
  applicationContext.start();
  return console.debug(applicationContext.marionetteHooks);
});
