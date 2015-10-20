var sinon = require('sinon')

require('sinon-as-promised')

module.exports = {
  simple: function () {
    return sinon.stub()
  },

  truthy: function () {
    return sinon.stub().returns(true)
  },

  falsy: function () {
    return sinon.stub().returns(false)
  },

  throws: function () {
    return sinon.stub().throws()
  },

  yields: function (result) {
    return sinon.stub().resolves(result || {})
  },

  rejects: function () {
    return sinon.stub().rejects()
  },

  builds: function (factory, trait) {
    return sinon.stub().resolves((factory.traits[trait] || factory).build())
  }
}
