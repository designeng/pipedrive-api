define({
  $plugins: ['plugins/marionette/router', 'plugins/marionette/module', 'plugins/container/register', 'plugins/element'],
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
      profiles: {
        $ref: 'profiles'
      },
      deals: {
        $ref: 'deals'
      },
      docs: {
        $ref: 'docs'
      },
      notFoundPageLayer: {
        $ref: "element!.not-found"
      }
    },
    registerIntercessors: ['startModule', 'showEntityList', 'showEntityDetailes'],
    ready: {
      showPreloader: {
        $ref: 'preloader'
      },
      switchOn: [
        {
          "navigation": {}
        }
      ],
      listenToDealsModule: {}
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
        'docs': 'docsModuleHandler',
        'docs/:id': 'docsModuleHandler',
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
  profiles: {
    wire: {
      spec: "application/modules/profiles/spec",
      defer: true,
      provide: {
        listRegion: {
          $ref: 'appInstance.regions.sidebarRegion'
        },
        personProfileRegion: {
          $ref: 'appInstance.regions.mainAreaRegion'
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
          $ref: 'appInstance.regions.sidebarRegion'
        },
        dealsBoardRegion: {
          $ref: 'appInstance.regions.mainAreaRegion'
        }
      }
    }
  },
  docs: {
    wire: {
      spec: "application/modules/docs/spec",
      defer: true,
      provide: {
        listRegion: {
          $ref: 'appInstance.regions.sidebarRegion'
        },
        documentationRegion: {
          $ref: 'appInstance.regions.mainAreaRegion'
        }
      }
    }
  },
  preloader: {
    create: "blocks/views/preloader/index"
  },
  start: function() {
    return this.appInstance.start();
  }
});
