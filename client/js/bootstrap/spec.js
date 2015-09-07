define({
  $plugins: [],
  marionetteHooks: {
    create: "bootstrap/hooks"
  },
  preloader: {
    create: "blocks/views/preloader/index"
  },
  notFoundPage: {
    $ref: "element!.not-found"
  }
});
