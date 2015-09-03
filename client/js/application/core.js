define({
  $plugins: ['plugins/marionette/router', 'plugins/marionette/module'],
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
      }
    }
  },
  router: {
    createRouter: {
      controller: {
        $ref: 'appController'
      },
      routes: {
        'profiles': 'showProfilesList',
        'profiles/:id': 'showProfileDetailes',
        'deals': 'showDealsList',
        'deals/:id': 'showDealsDetailes'
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
          $ref: 'appController.regions.sidebarRegion'
        },
        dealDetailsRegion: {
          $ref: 'appController.regions.mainAreaRegion'
        }
      }
    }
  },
  start: function() {
    return this.appInstance.start();
  }
});
