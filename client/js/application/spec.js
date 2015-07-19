define({
  $plugins: ['wire/debug', 'plugins/router', 'plugins/hbs', 'plugins/channel', 'plugins/application'],
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
  personProfile: {
    module: 'blocks/views/profile/index'
  },
  profilesChannel: {
    createChannel: {
      name: 'profiles'
    },
    channelEvents: {
      'profiles:list:show': {
        $ref: 'profilesApplicationController.showList'
      },
      'profiles:person:show': {
        $ref: 'profilesApplicationController.showPersonProfile'
      }
    }
  },
  profilesRouterController: {
    create: 'application/profiles/router/controller',
    properties: {
      profilesChannel: {
        $ref: 'profilesChannel'
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
  profilesApplicationController: {
    create: 'application/profiles/controller',
    properties: {
      profilesList: {
        $ref: 'profilesList'
      },
      profilesListItemTemplate: {
        $ref: 'hbs!application/profiles/templates/profilesListItem'
      }
    }
  },
  profilesApplication: {
    createApplication: {},
    withRegions: {
      navigationRegion: ".navigation",
      sidebarRegion: ".sidebar",
      mainAreaRegion: ".main-area"
    },
    addController: {
      $ref: 'profilesApplicationController'
    }
  },
  start: function() {
    return this.profilesApplication.start();
  }
});
