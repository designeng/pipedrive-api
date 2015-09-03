define({
  $plugins: ['wire/debug'],
  dealsCollection: {
    create: 'application/modules/deals/collections/deals',
    ready: {
      fetch: {}
    }
  },
  dealsList: {
    create: 'blocks/views/list/index',
    properties: {
      collection: {
        $ref: 'dealsCollection'
      },
      channel: {
        $ref: 'channel'
      },
      entity: "deal"
    },
    ready: {
      setChildTemplate: {
        $ref: 'hbs!templates/dealsListItem'
      }
    }
  },
  dealsController: {
    create: 'application/modules/deals/controller',
    properties: {
      collection: {
        $ref: 'dealsCollection'
      },
      channel: {
        $ref: 'channel'
      },
      list: {
        $ref: 'dealsList'
      }
    }
  },
  activateById: function(id) {
    return this.dealsController.activateById(id);
  }
});
