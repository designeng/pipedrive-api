define({
  $plugins: ['wire/debug', 'plugins/backbone/collection/underscore/apply'],
  boardHeader: {
    create: 'blocks/views/board/header/index'
  },
  boardBody: {
    create: 'blocks/views/board/body/index'
  },
  boardCollectionGroups: {
    applyTo: {
      collection: {
        $ref: 'collection'
      },
      methods: [
        {
          "groupBy": ["stage_id"]
        }
      ]
    }
  },
  stagesCollection: {
    create: 'application/modules/deals/board/collections/stages',
    ready: {
      fetch: {}
    }
  },
  boardController: {
    create: 'application/modules/deals/board/controller',
    properties: {
      groups: {
        $ref: 'boardCollectionGroups'
      },
      stagesCollection: {
        $ref: 'stagesCollection'
      }
    },
    ready: {
      onReady: {}
    }
  }
});
