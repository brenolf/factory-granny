var staticProto = require('../../../../lib/factory-granny/prototypes/static')

describe('FactoryGranny#static', function () {
  var FactoryGranny, subject

  beforeEach(function () {
    FactoryGranny = Factories.FactoryGranny.build()

    FactoryGranny._static = {}

    staticProto(FactoryGranny)

    subject = FactoryGranny.prototype.static
  })

  context('when there are dependencies', function () {
    it('adds them to the object', function () {
      var result = subject.call(FactoryGranny, 'heisenberg', ['a'], 42)
      var list = FactoryGranny._static

      expect(result).to.eql(FactoryGranny)

      expect(list).to.have.key('heisenberg')

      expect(list.heisenberg.dependencies).to.eql(['a'])

      expect(list.heisenberg.value).to.be.a.function

      expect(list.heisenberg.value()).to.eql(42)
    })
  })

  context('when there are no dependencies', function () {
    it('adds an empty array to the object', function () {
      var result = subject.call(FactoryGranny, 'heisenberg', 42)
      var list = FactoryGranny._static

      expect(result).to.eql(FactoryGranny)

      expect(list).to.have.key('heisenberg')

      expect(list.heisenberg.dependencies).to.eql([])

      expect(list.heisenberg.value).to.be.a.function

      expect(list.heisenberg.value()).to.eql(42)
    })
  })

  context('when a function is passed as value', function () {
    it('adds callable function as value', function () {
      var result = subject.call(FactoryGranny, 'heisenberg', function () {
        return 42
      })

      var list = FactoryGranny._static

      expect(result).to.eql(FactoryGranny)

      expect(list).to.have.key.heisenberg

      expect(list.heisenberg.dependencies).to.eql([])

      expect(list.heisenberg.value).to.be.a.function

      expect(list.heisenberg.value()).to.eql(42)
    })
  })
})
