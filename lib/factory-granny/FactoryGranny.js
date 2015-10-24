var Factory = require('rosie').Factory

var FactoryGranny = function () {
  Factory.call(this)
  this._static = []
  this.traits = {}
}

FactoryGranny.super_ = Factory
FactoryGranny.prototype = new Factory
FactoryGranny.prototype.constructor = FactoryGranny

module.exports = FactoryGranny
