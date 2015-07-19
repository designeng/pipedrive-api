define [
    'blocks/base/layout'
    'hbs!blocks/sidebar/template'
], (BaseLayout, sidebarTemplate) ->

    class Sidebar extends BaseLayout

        template: sidebarTemplate

        regions:
            list: '.list'