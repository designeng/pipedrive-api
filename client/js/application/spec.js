define({
  $plugins: ['wire/debug', 'plugins/router', 'plugins/hbs', 'plugins/channel', 'plugins/application'],
  navigation: {
    create: 'blocks/views/navigation/index'
  },
  userCorner: {
    create: 'blocks/views/user/corner/index'
  },
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
    module: 'blocks/views/profile/blank'
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
    },
    onRoute: {
      $ref: 'profilesApplicationController.onRoute'
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
      PersonProfile: {
        $ref: 'personProfile'
      },
      profilesCollection: {
        $ref: 'profilesCollection'
      },
      BlankProfile: {
        $ref: 'blankProfile'
      }
    }
  },
  profilesApplication: {
    createApplication: {},
    withRegions: {
      navigationRegion: ".navigation",
      userCornerRegion: ".user-corner",
      sidebarRegion: ".sidebar",
      mainAreaRegion: ".main-area"
    },
    showInRegion: {
      'navigationRegion': {
        $ref: 'navigation'
      },
      'userCornerRegion': {
        $ref: 'userCorner'
      }
    },
    addController: {
      $ref: 'profilesApplicationController'
    }
  },
  start: function() {
    return this.profilesApplication.start();
  }
});
