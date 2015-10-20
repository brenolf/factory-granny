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
    context('when a value to be yielded is given', function () {
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

    context('when no value to be yielded is given', function () {
      it('retuns a sinon stub that yields an object', function () {
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

  describe('#builds', function () {
    context('when a trait is given', function () {
      it('retuns a sinon stub that yields a trait object', function () {
        var factory = Factories.GenericFactory.build()

        var subject = box.builds(factory, 'trait')()

        expect(subject.isSinonProxy).to.be.truthy
        expect(subject.called).to.be.falsy

        expect(factory.traits.trait.build).to.have.been.calledOnce
        expect(factory.build).not.to.have.been.called
      })
    })

    context('when no trait is given', function () {
      it('retuns a sinon stub that yields a ordinary object', function () {
        var factory = Factories.GenericFactory.traits.noTraits.build()

        var subject = box.builds(factory, 'trait')()

        expect(subject.isSinonProxy).to.be.truthy
        expect(subject.called).to.be.falsy

        expect(factory.build).to.have.been.called
      })
    })
  })
})
