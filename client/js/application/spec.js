define({
  $plugins: ['wire/debug', 'plugins/router'],
  profilesCollection: {
    create: 'application/profiles/collections/profiles'
  },
  profilesListItem: {
    create: 'blocks/list/item',
    properties: {
      template: "hbs!application/profiles/templates/profilesListItem"
    }
  },
  profilesList: {
    create: 'blocks/list/index',
    properties: {
      collection: {
        $ref: 'profilesCollection'
      },
      itemView: {
        $ref: 'profilesListItem'
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
