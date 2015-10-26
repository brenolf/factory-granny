Factories
.FactoryGranny = new Factory()
.attr('traits', {})
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
.traits.stubbedTrait = new Factory()
.extend(Factories.FactoryGranny)
.attr('trait', sinon.stub)

Factories.FactoryGranny
.traits.static = new Factory()
.extend(Factories.FactoryGranny)
.attr('_static', {
  attr1: {
    dependencies: ['name'],
    value: function () {
      return 42
    }
  }
})
.attr('callbacks', [1, 2, 3])
.attr('sequences', {
  a: 1
})
.attr('opts', {
  b: 2
})
.attr('attrs', {
  c: 3
})
.attr('traits', {
  name: {
    sequences: {
      aa: 1
    }
  }
})
