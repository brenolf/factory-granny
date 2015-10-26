var fn = function (FactoryGranny) {
  FactoryGranny.prototype.build = function (attributes, options) {
    var super_ = FactoryGranny.super_.prototype

    var value = super_.build.call(this, attributes, options)

    for (var name in value) {
      if (typeof value[name] === 'function' && value[name].isSinonProxy) {
        value[name].reset()
      }
    }

    return value
  }
}

module.exports = fn
