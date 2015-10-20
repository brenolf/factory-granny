var fn = function (FactoryGranny) {
  FactoryGranny.prototype.traits = []

  FactoryGranny.prototype.trait = function (name) {
    this.traits[name] = new this.constructor()

    this.traits[name].extend(this)

    return this.traits[name]
  }
}

module.exports = fn
