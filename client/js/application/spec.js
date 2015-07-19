define({
  $plugins: ['wire/debug', 'plugins/router', 'plugins/hbs'],
  profilesCollection: {
    create: 'application/profiles/collections/profiles'
  },
  profilesList: {
    create: 'blocks/views/list/index',
    properties: {
      collection: {
        $ref: 'profilesCollection'
      }
    }
  },
  profilesRouterController: {
    create: 'application/profiles/router/controller',
    properties: {
      sidebar: {
        $ref: 'sidebar'
      },
      mainArea: {
        $ref: 'mainArea'
      },
      profilesList: {
        $ref: 'profilesList'
      },
      profilesListItemTemplate: {
        $ref: 'hbs!application/profiles/templates/profilesListItem'
      }
    }
  },
  profilesRouter: {
    createRouter: {
      controller: {
        $ref: 'profilesRouterController'
      },
      routes: {
        'profiles': 'showProfilesList',
        'profiles/:id': 'showProfile'
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
      },
      sidebar: {
        $ref: 'sidebar'
      }
    }
  },
  start: function() {
    return this.profilesInstance.start();
  }
});
