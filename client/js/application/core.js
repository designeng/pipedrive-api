define({
  $plugins: ['wire/debug', 'plugins/marionette/router', 'plugins/marionette/module'],
  appInstance: {
    createModule: {
      withRegions: {
        navigationRegion: ".navigation",
        sidebarRegion: ".sidebar",
        mainAreaRegion: ".main-area"
      },
      onStart: function() {
        return Backbone.history.start();
      }
    },
    showInRegion: {
      'navigationRegion': {
        $ref: 'navigation.layout'
      }
    },
    addController: {
      $ref: 'appController'
    }
  },
  appController: {
    create: "application/appController",
    properties: {
      profiles: {
        $ref: 'profiles'
      },
      deals: {
        $ref: 'deals'
      },
      Preloader: {
        $ref: 'preloader'
      }
    }
  },
  router: {
    createRouter: {
      controller: {
        $ref: 'appController'
      },
      routes: {
        'profiles': 'showProfilesModule',
        'profiles/:id': 'showProfilesModule',
        'deals': 'showDealsModule',
        'deals/:id': 'showDealsModule',
        '*notFound': 'notFound'
      }
    },
    onRoute: {
      $ref: 'appController.onRoute'
    }
  },
  navigation: {
    wire: {
      spec: "application/modules/navigation/spec"
    }
  },
  profiles: {
    wire: {
      spec: "application/modules/profiles/spec",
      defer: true,
      provide: {
        listRegion: {
          $ref: 'appController.regions.sidebarRegion'
        },
        personProfileRegion: {
          $ref: 'appController.regions.mainAreaRegion'
        }
      }
    }
  },
  deals: {
    wire: {
      spec: "application/modules/deals/spec",
      defer: true,
      provide: {
        listRegion: {
          $ref: 'appController.regions.mainAreaRegion'
        },
        dealDetailsRegion: {
          $ref: 'appController.regions.sidebarRegion'
        }
      }
    }
  },
  start: function() {
    return this.appInstance.start();
  }
});
