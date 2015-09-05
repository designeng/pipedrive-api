define [
    "wire"
    "when"
    "backbone"
], (wire, When, Backbone) ->

    define 'plugins/apply/collection', () ->
        class Collection extends Backbone.Collection
            initialize: ->
                @.add [
                    {id: 0, stage_id: 0}
                    {id: 1, stage_id: 0}
                    {id: 2, stage_id: 1}
                    {id: 3, stage_id: 1}
                    {id: 4, stage_id: 2}
                    {id: 5, stage_id: 2}
                    {id: 6, stage_id: 2}
                ]

    spec = 
        $plugins:[
            'wire/debug'
            'plugins/backbone/collection/underscore/apply'
        ]

        collection:
            create: 'plugins/apply/collection'

        groups:
            applyTo:
                collection: {$ref: 'collection'}
                methods: [
                    "groupBy": ["stage_id"]
                    "map": [(item, index) -> new Backbone.Collection(item)]
                ]

    describe "apply plugin", ->

        beforeEach (done) ->
            wire(spec).then (@ctx) =>
                console.debug "CTXT", @ctx.groups
                done()
            .otherwise (err) ->
                console.log "ERROR", err

        it "should have 3 groups", (done) ->
            expect(_.size(@ctx.groups)).toBe 3
            done()

        it "group number 2 should have 3 elements", (done) ->
            expect(@ctx.groups[2].length).toBe 3
            done()