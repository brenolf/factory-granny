var traits = require('../../../../lib/factory-granny/prototypes/traits')

describe('FactoryGranny#trait', function () {
  var FactoryGranny, subject

  beforeEach(function () {
    FactoryGranny = Factories.FactoryGranny.traits.static.build()

    traits(FactoryGranny)

    subject = FactoryGranny.prototype.trait
  })

  it('inserts a new object with the given trait name', function () {
    subject.call(FactoryGranny, 'heisenberg')

    expect(FactoryGranny.constructor).to.have.been.calledWithNew
    expect(FactoryGranny.traits).to.have.any.keys('heisenberg')
    expect(FactoryGranny.traits.heisenberg._static).to.have.key('attr1')
    expect(FactoryGranny.traits.heisenberg._static.attr1.value()).to.eql(42)
  })
})
