define({
  $plugins: ['wire/debug'],
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
  }
});
