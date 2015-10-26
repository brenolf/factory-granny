var build = require('../../../../lib/factory-granny/prototypes/build')

describe('FactoryGranny#build', function () {
  var FactoryGranny, subject

  beforeEach(function () {
    FactoryGranny = Factories.FactoryGranny.traits.traitWithStub.build()

    build(FactoryGranny)

    subject = FactoryGranny.prototype.build
  })

  it('returns an instance of the factory with reset stubs', function () {
    var result = subject()

    result.stub()
    result.stub()

    expect(result).to.have.keys('stub', 'x')
    expect(result.stub.callCount).to.eql(2)

    result = subject()

    expect(result.stub.callCount).to.eql(0)
  })
})
