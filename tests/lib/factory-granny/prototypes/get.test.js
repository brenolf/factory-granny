var get = require('../../../../lib/factory-granny/prototypes/get')

describe('FactoryGranny#get', function () {
  var FactoryGranny, FactoryGrannyStatic, subject

  beforeEach(function () {
    FactoryGranny = Factories.FactoryGranny.build()
    FactoryGrannyStatic = Factories.FactoryGranny.traits.static.build()

    get(FactoryGranny)

    subject = FactoryGranny.prototype.get
  })

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
