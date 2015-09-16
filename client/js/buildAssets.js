define(["jquery", "wire/lib/context", "wire/lib/WireContext", "wire/lib/scope", "wire/lib/plugin/registry", "wire/lib/plugin/defaultPlugins", "wire/lib/graph/DirectedGraph", "wire/lib/graph/trackInflightRefs", "wire/lib/Map", "wire/lib/ComponentFactory", "wire/lib/lifecycle", "wire/lib/resolver", "wire/lib/graph/cyclesTracker", "wire/lib/instantiate", "wire/lib/plugin/wirePlugin", "wire/lib/plugin/basePlugin", "wire/lib/graph/tarjan", "wire/lib/graph/formatCycles", "wire/lib/ObjectProxy", "wire/lib/invoker", "wire/lib/pipeline"], function($) {
  var err, noop;
  noop = function() {};
  try {
    return $('#livereload').html("<script src='http://" + "localhost" + ":35729/livereload.js?snipver=1' />");
  } catch (_error) {
    err = _error;
    return noop();
  }
});
