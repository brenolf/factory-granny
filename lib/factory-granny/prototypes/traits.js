var copy = require('shallow-copy')

var fn = function (FactoryGranny) {
  FactoryGranny.prototype.trait = function (name) {
    this.traits[name] = new this.constructor()

    this.traits[name].extend(this)

    this.traits[name]._static = copy(this._static)

    return this.traits[name]
  }
}

module.exports = fn
