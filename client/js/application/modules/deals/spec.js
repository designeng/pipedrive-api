define({
  $plugins: ['plugins/hbs'],
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
      list: {
        $ref: 'dealsList'
      }
    },
    ready: {
      onReady: {}
    }
  },
  activateById: function(id) {
    return this.dealsController.activateById(id);
  },
  showList: function() {
    return this.listRegion.show(this.dealsList);
  },
  showDetailes: function(id) {}
});
