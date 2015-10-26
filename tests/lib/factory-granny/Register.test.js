var Register = rewire('../lib/factory-granny/Register')

describe('Register', function () {
  var subject

  beforeEach(function () {
    Register.__set__('box', {
      x: sinon.stub()
    })

    subject = new Register
  })

  describe('#constructor', function () {
    it('returns a callable function', function () {
      expect(subject.box).to.have.key('x')

      expect(subject.box.x).to.be.a('function')

      expect(subject).to.be.a('function')
    })
  })
})
