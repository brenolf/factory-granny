var PROTOTYPES = 'factory-granny/prototypes'
var PATH = __dirname + '/' + PROTOTYPES

var wrench = require('wrench')
var FactoryGranny = require('./factory-granny/FactoryGranny')

wrench.readdirSyncRecursive(PATH)
.forEach(function (name) {
  require('./' + PROTOTYPES + '/' + name)(FactoryGranny)
})

module.exports = new (require('./factory-granny/Register'))
