var FactoryGranny = require('../../../lib/factory-granny/FactoryGranny')
var Register = rewire('../lib/factory-granny/Register')

describe('Register', function () {
  var subject

  beforeEach(function () {
    Register.__set__('box', {
      x: 42
    })

    subject = new Register
  })

  describe('#constructor', function () {
    it('returns a callable function', function () {
      expect(subject.box).to.eql({
        x: 42
      })

      expect(subject).to.be.a('function')
    })
  })
})
