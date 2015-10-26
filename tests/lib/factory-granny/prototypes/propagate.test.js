var propagate = require('../../../../lib/factory-granny/prototypes/propagate')

describe('FactoryGranny#propagate', function () {
  var FactoryGranny, FactoryGrannyStatic, subject

  beforeEach(function () {
    FactoryGranny = Factories.FactoryGranny.build()
    FactoryGrannyStatic = Factories.FactoryGranny.traits.static.build()

    propagate(FactoryGranny)

    subject = FactoryGranny.prototype.propagate
  })

  it('returns a constructor for the object with static properties',
  function () {
    subject.call(FactoryGrannyStatic)

    var target = FactoryGrannyStatic.traits.name

    expect(target.sequences).to.eql({
      a: 1,
      aa: 1
    })

    expect(target.opts).to.eql({
      b: 2
    })

    expect(target.attrs).to.eql({
      c: 3
    })

    expect(target._static).to.have.key('attr1')
  })
})
