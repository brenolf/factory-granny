var sinon = require('sinon')

require('sinon-as-promised')

module.exports = {
  simple: function () {
    return sinon.stub
  },

  true: function () {
    var s = sinon.stub()

    return s.returns.bind(s, true)
  },

  false: function () {
    var s = sinon.stub()

    return s.returns.bind(s, false)
  },

  throws: function () {
    var s = sinon.stub()

    return s.throws.bind(s)
  },

  resolves: function (result) {
    var s = sinon.stub()

    return s.resolves.bind(s, result || {})
  },

  rejects: function () {
    var s = sinon.stub()

    return s.rejects.bind(s)
  },

  builds: function (factory, trait) {
    var s = sinon.stub()

    return s.resolves.bind(s, (factory.traits[trait] || factory).build())
  }
}
