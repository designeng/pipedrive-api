define({
  $plugins: ['wire/debug', 'plugins/hbs'],
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
      entity: "deal",
      childTemplate: {
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
      },
      listRegion: {
        $ref: 'listRegion'
      }
    },
    ready: {
      onReady: {}
    }
  },
  dealsBoard: {
    wire: {
      spec: 'application/modules/deals/board/spec',
      provide: {
        collection: {
          $ref: 'dealsCollection'
        },
        dealsBoardRegion: {
          $ref: 'listRegion'
        }
      }
    }
  },
  activateById: function(id) {
    return this.dealsController.activateById(id);
  },
  showList: function() {},
  showDetailes: function(id) {}
});
