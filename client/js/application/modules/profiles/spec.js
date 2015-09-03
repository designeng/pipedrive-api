define({
  $plugins: ['wire/debug', 'plugins/hbs'],
  profilesCollection: {
    create: 'application/modules/profiles/collections/profiles',
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
      list: {
        $ref: 'profilesList'
      },
      PersonProfile: {
        $ref: 'personProfile'
      },
      PersonProfileDeals: {
        $ref: 'personProfileDeals'
      },
      personProfileRegion: {
        $ref: 'personProfileRegion'
      }
    }
  },
  activateById: function(id) {
    return this.profilesController.activateById(id);
  },
  showList: function() {
    return this.listRegion.show(this.profilesList);
  },
  showDetailes: function(id) {
    return this.profilesController.showProfileDetailes(id);
  }
});
