define({
  $plugins: ['wire/debug'],
  layout: {
    create: 'blocks/views/navigation/index'
  },
  getLayout: function() {
    console.debug("getLayout", this.layout);
    return this.layout;
  }
});
