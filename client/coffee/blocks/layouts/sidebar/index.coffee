define [
    'blocks/layouts/base/layout'
    'hbs!blocks/layouts/sidebar/template'
], (BaseLayout, sidebarTemplate) ->

    class Sidebar extends BaseLayout

        template: sidebarTemplate

        regions:
            list: '.list'