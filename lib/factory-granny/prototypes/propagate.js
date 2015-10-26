var merge = require('merge')
var copy = merge.bind(merge, true)

var fn = function (FactoryGranny) {
  FactoryGranny.prototype.propagate = function () {
    for (var trait in this.traits) {
      var current = this.traits[trait]

      current.attrs = merge(copy(this.attrs), current.attrs)

      current.opts = merge(copy(this.opts), current.opts)

      current.sequences = merge(copy(this.sequences), current.sequences)

      current.callbacks = this.callbacks.concat(current.callbacks)

      current._static = merge(copy(this._static), current._static)

      return current
    }
  }
}

module.exports = fn
