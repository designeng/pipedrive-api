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
    create: "application/profiles/router"
  },
  profilesInstance: {
    create: {
      module: "application/profiles/instance"
    },
    properties: {
      router: {
        $ref: 'router'
      }
    }
  },
  start: function() {
    return this.profilesInstance.start();
  }
});
