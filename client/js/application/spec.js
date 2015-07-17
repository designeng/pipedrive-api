define({
  $plugins: ['wire/debug'],
  navigation: {
    create: "blocks/navigation/index"
  },
  sidebar: {
    create: "blocks/sidebar/index"
  },
  mainArea: {
    create: "blocks/mainArea/index"
  },
  router: {
    create: "application/router"
  },
  applicationInstance: {
    create: {
      module: "application/instance"
    },
    properties: {
      router: {
        $ref: 'router'
      }
    }
  },
  start: function() {
    return this.applicationInstance.start();
  }
});
