define({
  $plugins: ['wire/debug', 'plugins/hbs', 'plugins/marionette/layout'],
  layout: {
    createLayout: {
      fromTemplate: {
        $ref: 'hbs!templates/navigation'
      },
      withRegions: {
        userCornerRegion: ".user-corner"
      }
    },
    showInRegion: {
      'userCornerRegion': {
        $ref: 'userCorner'
      }
    }
  },
  userCorner: {
    create: 'blocks/views/user/corner/index'
  }
});
