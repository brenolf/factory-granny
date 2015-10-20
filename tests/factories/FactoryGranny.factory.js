Factories
.FactoryGranny = new Factory()
.attr('traits', [])
.attr('constructor', function () {
  return sinon.stub().returns({
    extend: sinon.stub
  })
})
.attr('prototype', {})
.attr('_static', [])
.attr('super_', {
  prototype: {
    build: sinon.stub().returns({
      x: 42
    })
  }
})

Factories.FactoryGranny
.traits.static = new Factory()
.extend(Factories.FactoryGranny)
.attr('_static', [{
  name: 'attr1',
  dependencies: ['name'],
  value: function () {
    return 42
  }
}])
