var fn = function (FactoryGranny) {
  FactoryGranny.prototype.get = function (attributes, options) {
    var super_ = FactoryGranny.super_.prototype

    var instance = super_.build.call(this, attributes, options)

    var value = function () {
      return instance
    }

    this._static.forEach(function (element) {
      var dependencies = element.dependencies.map(function (name) {
        return instance[name]
      })

      value[element.name] = element.value.apply(null, dependencies)
    })

    value._instance = instance

    return value
  }
}

module.exports = fn
