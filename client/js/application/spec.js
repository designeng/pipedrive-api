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
  blankProfile: {
    create: 'blocks/views/profile/blank'
  },
  profilesChannel: {
    createChannel: {
      name: 'profiles'
    },
    channelEvents: {
      'profiles:list:show': {
        $ref: 'profilesApplicationController.showProfilesList'
      },
      'profiles:person:show': {
        $ref: 'profilesApplicationController.showProfileDetailes'
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
        'profiles/:id': 'showProfileDetailes'
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
      },
      personProfile: {
        $ref: 'personProfile'
      },
      profilesCollection: {
        $ref: 'profilesCollection'
      },
      blankProfile: {
        $ref: 'blankProfile'
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
