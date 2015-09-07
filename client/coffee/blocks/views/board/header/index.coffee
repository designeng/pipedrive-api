define [
    'blocks/views/base/collectionView'
    'hbs!templates/boardHeader'
    './cell'
], (CollectionView, boardHeader, HeaderCellView) ->

    class BoardHeaderView extends CollectionView
        tagName: "tr"
        template: boardHeader
        childView: HeaderCellView