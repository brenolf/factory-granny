var box = require('../../../../lib/factory-granny/statics/box')

describe('Factory#box', function () {
  describe('#simple', function () {
    it('returns a sinon stub', function () {
      var subject = box.simple()()

      expect(subject.isSinonProxy).to.be.true
      expect(subject.called).to.be.false
    })
  })

  describe('#true', function () {
    it('returns a sinon stub that returns true', function () {
      var subject = box.true()()

      expect(subject.isSinonProxy).to.be.truthy
      expect(subject.called).to.be.falsy
      expect(subject()).to.be.true
    })
  })

  describe('#false', function () {
    it('returns a sinon stub that returns false', function () {
      var subject = box.false()()

      expect(subject.isSinonProxy).to.be.truthy
      expect(subject.called).to.be.falsy
      expect(subject()).to.be.false
    })
  })

  describe('#returns', function () {
    it('returns a sinon stub that returns a given value', function () {
      var subject = box.returns(42)()

      expect(subject.isSinonProxy).to.be.truthy
      expect(subject.called).to.be.falsy
      expect(subject()).to.be.eql(42)
    })
  })

  describe('#throws', function () {
    it('returns a sinon stub that throws an error', function () {
      var subject = box.throws()()

      expect(subject.isSinonProxy).to.be.truthy
      expect(subject.called).to.be.falsy
      expect(function () {
        subject()
      }).to.throw()
    })
  })

  describe('#resolves', function () {
    context('when a value is given', function () {
      it('retuns a sinon stub that yields the given object', function () {
        var subject = box.resolves({
          x: 42
        })()

        expect(subject.isSinonProxy).to.be.truthy
        expect(subject.called).to.be.falsy

        return expect(subject()).to.eventually.eql({
          x: 42
        })
      })
    })

    context('when no value is given', function () {
      it('retuns a sinon stub that yields an empty object', function () {
        var subject = box.resolves()()

        expect(subject.isSinonProxy).to.be.truthy
        expect(subject.called).to.be.falsy

        return expect(subject()).to.eventually.eql({})
      })
    })
  })

  describe('#rejects', function () {
    it('returns a sinon stub that always rejects', function () {
      var subject = box.rejects()()

      expect(subject.isSinonProxy).to.be.truthy
      expect(subject.called).to.be.falsy

      return expect(subject()).to.be.rejected
    })
  })

  describe('#build', function () {
    context('when a factory is given', function () {
      it('retuns a instance of the factory', function () {
        var factory = Factories.GenericFactory.build()

        var subject = box.build.call(factory, 'trait')()

        expect(subject.isSinonProxy).not.to.be.truthy
        expect(subject.called).not.to.be.falsy

        expect(subject).to.eql({
          name: 'myname'
        })
      })
    })

    context('when no trait is given', function () {
      it('retuns the last used factory', function () {
        var factory = Factories.GenericFactory.traits.withLast.build()

        var subject = box.build.call(factory)()

        expect(subject.isSinonProxy).not.to.be.truthy
        expect(subject.called).not.to.be.falsy

        expect(subject).to.eql({
          name: 'factoryName'
        })
      })
    })
  })

  describe('#chain', function () {
    context('when a factory is given', function () {
      it('retuns a sinon stub that returns a factory object', function () {
        var factory = Factories.GenericFactory.build()

        var subject = box.chain.call(factory, 'trait')()

        expect(subject.isSinonProxy).to.be.truthy
        expect(subject.called).to.be.falsy

        expect(subject()).to.eql({
          name: 'myname'
        })
      })
    })

    context('when no trait is given', function () {
      it('retuns the last used factory', function () {
        var factory = Factories.GenericFactory.traits.withLast.build()

        var subject = box.chain.call(factory)()

        expect(subject.isSinonProxy).to.be.truthy
        expect(subject.called).to.be.falsy

        expect(subject()).to.eql({
          name: 'factoryName'
        })
      })
    })
  })

  describe('#chainAsync', function () {
    context('when a factory is given', function () {
      it('retuns a sinon stub that returns a factory object', function () {
        var factory = Factories.GenericFactory.build()

        var subject = box.chainAsync.call(factory, 'trait')()

        expect(subject.isSinonProxy).to.be.truthy
        expect(subject.called).to.be.falsy

        expect(subject()).to.eventually.eql({
          name: 'myname'
        })
      })
    })

    context('when no trait is given', function () {
      it('retuns the last used factory', function () {
        var factory = Factories.GenericFactory.traits.withLast.build()

        var subject = box.chainAsync.call(factory)()

        expect(subject.isSinonProxy).to.be.truthy
        expect(subject.called).to.be.falsy

        expect(subject()).to.eventually.eql({
          name: 'factoryName'
        })
      })
    })
  })
})
