var fn = function (FactoryGranny) {
  FactoryGranny.prototype.static = function (name, dependencies, value) {
    if (value === undefined) {
      value = dependencies
      dependencies = null
    }

    this._static[name] = {
      dependencies: dependencies || [],
      value: typeof value === 'function' ? value : function () {
        return value
      }
    }

    return this
  }
}

module.exports = fn
