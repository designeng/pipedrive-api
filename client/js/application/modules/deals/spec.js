define({
  $plugins: ['plugins/hbs'],
  publicApi: {
    literal: {
      showList: {
        $ref: 'dealsController.showList'
      },
      showDetailes: {
        $ref: 'dealsController.showDealDetailes'
      }
    }
  },
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
      },
      activeCellClass: "active-deal"
    }
  },
  dealsController: {
    create: 'application/modules/deals/controller',
    properties: {
      list: {
        $ref: 'dealsList'
      },
      listRegion: {
        $ref: 'listRegion'
      },
      dealsBoard: {
        $ref: 'dealsBoard'
      },
      sandbox: {
        $ref: 'sandbox'
      }
    }
  },
  dealsBoard: {
    wire: {
      spec: 'application/modules/deals/board/spec',
      provide: {
        dealsCollection: {
          $ref: 'dealsCollection'
        },
        dealsBoardRegion: {
          $ref: 'dealsBoardRegion'
        }
      }
    }
  }
});
