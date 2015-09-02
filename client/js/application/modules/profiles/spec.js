define({
  $plugins: ['wire/debug', 'plugins/hbs', 'plugins/marionette/layout'],
  profilesLayout: {
    createLayout: {
      fromTemplate: {
        $ref: 'hbs!templates/profiles'
      },
      withRegions: {
        sidebarRegion: ".sidebar-area",
        mainAreaRegion: ".main-area"
      }
    }
  },
  profilesCollection: {
    create: 'application/profiles/collections/profiles',
    ready: {
      fetch: {}
    }
  },
  profilesList: {
    create: 'blocks/views/list/index',
    properties: {
      collection: {
        $ref: 'profilesCollection'
      },
      channel: {
        $ref: 'channel'
      },
      entity: "profile"
    },
    ready: {
      setChildTemplate: {
        $ref: 'hbs!templates/profilesListItem'
      }
    }
  },
  personProfile: {
    module: 'blocks/views/profile/index'
  },
  personProfileDeals: {
    module: 'blocks/views/profile/deals/index'
  },
  profilesController: {
    create: 'application/modules/profiles/controller',
    properties: {
      collection: {
        $ref: 'profilesCollection'
      },
      channel: {
        $ref: 'channel'
      },
      list: {
        $ref: 'profilesList'
      },
      PersonProfile: {
        $ref: 'personProfile'
      },
      PersonProfileDeals: {
        $ref: 'personProfileDeals'
      },
      profilesLayout: {
        $ref: 'profilesLayout'
      }
    },
    ready: {
      onReady: {}
    }
  }
});
