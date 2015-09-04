define({
  $plugins: ['plugins/hbs', 'plugins/marionette/layout'],
  layout: {
    createLayout: {
      fromTemplate: {
        $ref: 'hbs!templates/navigation'
      },
      withRegions: {
        userCornerRegion: ".user-corner"
      }
    },
    renderIn: {
      $ref: 'navigationRegion'
    },
    showInRegions: {
      'userCornerRegion': {
        $ref: 'userCorner'
      }
    }
  },
  userCorner: {
    create: 'blocks/views/user/corner/index'
  }
});
