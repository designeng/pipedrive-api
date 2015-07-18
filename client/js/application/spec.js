define({
  $plugins: ['wire/debug', 'plugins/router'],
  profilesRouterController: {
    create: 'application/profiles/router/controller',
    properties: {
      sidebar: {
        $ref: 'sidebar'
      },
      mainArea: {
        $ref: 'mainArea'
      }
    }
  },
  profilesRouter: {
    createRouter: {
      controller: {
        $ref: 'profilesRouterController'
      },
      routes: {
        'profiles': 'showProfilesList'
      }
    }
  },
  profilesInstance: {
    create: {
      module: 'application/profiles/instance'
    },
    properties: {
      router: {
        $ref: 'profilesRouter'
      }
    }
  },
  start: function() {
    return this.profilesInstance.start();
  }
});
