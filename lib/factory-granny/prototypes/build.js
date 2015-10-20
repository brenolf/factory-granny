var fn = function (FactoryGranny) {
  FactoryGranny.prototype.build = function (attributes, options) {
    var super_ = FactoryGranny.super_.prototype

    var instance = super_.build.call(this, attributes, options)

    if (this._static.length === 0) {
      return instance
    }

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
