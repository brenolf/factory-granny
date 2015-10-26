var Registry = rewire('../lib/factory-granny/Registry')

describe('Registry', function () {
  var factory, subject, instance, revert

  beforeEach(function () {
    instance = Factories.FactoryGranny.traits.stubbedTrait.build()

    factory = function () {
      return instance
    }

    revert = Registry.__set__('FactoryGranny', factory)

    subject = new Registry
  })

  afterEach(function () {
    revert()
  })

  describe('#constructor', function () {
    it('returns an instance of the class', function () {
      expect(subject._factories).to.eql(instance)
      expect(subject).to.be.instanceOf(Registry)
    })
  })

  describe('#register', function () {
    context('when the factory is not registered', function () {
      it('register the factory', function () {
        subject.register('Name')

        expect(instance.trait).to.have.been.calledWith('Name')
      })
    })

    context('when no argument is passed and there is no last', function () {
      it('throws an error', function () {
        expect(function () {
          subject.register()
        }).to.throw()
      })
    })

    context('when the factory is registered', function () {
      beforeEach(function () {
        instance.traits = {
          'Name': {
            name: 4242
          }
        }
      })

      it('register the factory', function () {
        var result = subject.register('Name')

        expect(instance.trait).not.to.have.been.calledWith('Name')
        expect(result).to.eql({
          name: 4242
        })
      })
    })
  })
})
