var FactoryGranny = require('./FactoryGranny')

var Registry = function (name) {
  this._factories = new FactoryGranny()
}

Registry.prototype._findOrCreate = function (parent, child) {
  if (!parent.traits[child]) {
    parent.trait(child)
  }

  return parent.traits[child]
}

Registry.prototype.register = function (name) {
  name = name.split('.')

  if (!Array.isArray(name)) {
    name = [name]
  }

  name[0] = this._findOrCreate(this._factories, name[0])

  var that = this

  return name.reduce(function (factory, trait) {
    return that._findOrCreate(factory, trait)
  })
}

module.exports = Registry
