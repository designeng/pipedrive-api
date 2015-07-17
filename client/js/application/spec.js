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
  profilesApplicationInstance: {
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
    return this.profilesApplicationInstance.start();
  }
});
