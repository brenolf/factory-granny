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

  returns: function (value) {
    var s = sinon.stub()

    return s.returns.bind(s, value)
  },

  throws: function () {
    var s = sinon.stub()

    return s.throws.bind(s)
  },

  resolves: function (result) {
    var s = sinon.stub()

    if (result === undefined) {
      result = {}
    }

    return s.resolves.bind(s, result)
  },

  rejects: function () {
    var s = sinon.stub()

    return s.rejects.bind(s)
  },

  chain: function (factory) {
    var that = this

    factory = factory || that._last

    return function () {
      return sinon.stub().returns(that.register(factory).build())
    }
  },

  chainAsync: function (factory) {
    var that = this

    factory = factory || that._last

    return function () {
      return sinon.stub().resolves(that.register(factory).build())
    }
  }
}
