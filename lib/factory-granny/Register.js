var Registry = require('./Registry')
var box = require('./statics/box')

var Register = function () {
  this.registry = new Registry

  var bound = this.registry.register.bind(this.registry)

  bound.box = {}

  for (var fn in box) {
    bound.box[fn] = box[fn].bind(this.registry)
  }

  return bound
}

module.exports = Register
