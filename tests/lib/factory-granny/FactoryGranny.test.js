var Factory = require('rosie').Factory
var FactoryGranny = require('../../../lib/factory-granny/FactoryGranny')

describe('FactoryGranny', function () {
  var factory

  beforeEach(function () {
    factory = new FactoryGranny
  })

  describe('#constructor', function () {
    it('returns an instance of the class', function () {
      expect(FactoryGranny.super_).to.eql(Factory)
      expect(factory).to.be.instanceOf(FactoryGranny)
    })
  })
})
