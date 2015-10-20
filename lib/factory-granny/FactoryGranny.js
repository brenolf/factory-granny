var Factory = require('rosie').Factory

var FactoryGranny = function () {
  Factory.call(this)
}

FactoryGranny.super_ = Factory
FactoryGranny.prototype = new Factory
FactoryGranny.prototype.constructor = FactoryGranny

module.exports = FactoryGranny
