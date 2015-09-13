define({
  $plugins: ['wire/debug', 'plugins/marionette/router', 'plugins/marionette/module', 'plugins/container/register', 'plugins/element'],
  appInstance: {
    createApplication: {
      withRegions: {
        navigationRegion: ".navigation",
        sidebarRegion: ".sidebar",
        mainAreaRegion: ".main-area"
      },
      onStart: function() {
        return Backbone.history.start();
      }
    },
    addController: {
      $ref: 'appController'
    }
  },
  appController: {
    create: "application/appController",
    properties: {
      navigation: {
        $ref: 'navigation'
      },
      perspective: {
        $ref: 'perspective'
      },
      profiles: {
        $ref: 'profiles'
      },
      deals: {
        $ref: 'deals'
      },
      notFoundPageLayer: {
        $ref: "element!.not-found"
      }
    },
    registerIntercessors: ['startModule', 'createEntityList', 'createEntityDetailes'],
    ready: {
      showPreloader: {
        $ref: 'preloader'
      },
      switchOn: [
        {
          "navigation": {},
          "perspective": {}
        }
      ],
      listenToModules: {}
    }
  },
  router: {
    createRouter: {
      controller: {
        $ref: 'appController'
      },
      routes: {
        'profiles': 'profilesModuleHandler',
        'profiles/:id': 'profilesModuleHandler',
        'deals': 'dealsModuleHandler',
        'deals/:id': 'dealsModuleHandler',
        '*notFound': 'notFoundHandler'
      }
    },
    onRoute: {
      $ref: 'appController.onRoute'
    }
  },
  navigation: {
    wire: {
      spec: "application/modules/navigation/spec",
      defer: true,
      provide: {
        navigationRegion: {
          $ref: 'appInstance.regions.navigationRegion'
        }
      }
    }
  },
  perspective: {
    wire: {
      spec: "application/modules/perspective/spec",
      defer: true,
      provide: {
        sidebarRegion: {
          $ref: 'appInstance.regions.sidebarRegion'
        },
        mainAreaRegion: {
          $ref: 'appInstance.regions.mainAreaRegion'
        }
      }
    }
  },
  profiles: {
    wire: {
      spec: "application/modules/profiles/spec",
      defer: true
    }
  },
  deals: {
    wire: {
      spec: "application/modules/deals/spec",
      defer: true
    }
  },
  preloader: {
    create: "blocks/views/preloader/index"
  },
  start: function() {
    return this.appInstance.start();
  }
});
