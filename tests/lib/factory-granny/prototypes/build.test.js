var build = require('../../../../lib/factory-granny/prototypes/build')

describe('FactoryGranny#build', function () {
  var FactoryGranny, FactoryGrannyStatic, subject

  beforeEach(function () {
    FactoryGranny = Factories.FactoryGranny.build()
    FactoryGrannyStatic = Factories.FactoryGranny.traits.static.build()

    build(FactoryGranny)

    subject = FactoryGranny.prototype.build
  })

  context('when there is no static properties', function () {
    it('returns a common object', function () {
      var result = subject.call(FactoryGranny)

      expect(result).to.eql({
        x: 42
      })
    })
  })

  context('when there is static properties', function () {
    it('returns a constructor for the object with static properties',
    function () {
      var result = subject.call(FactoryGrannyStatic)

      var expected = {
        x: 42
      }

      expect(result._instance).to.eql(expected)
      expect(result).to.be.a.function
      expect(result()).to.eql(expected)
      expect(result.attr1).to.eql(42)
    })
  })
})
