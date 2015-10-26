Factories
.GenericFactory = new Factory()
.attr('traits', {
  'trait': {
    'build': sinon.stub()
  }
})
.attr('build', sinon.stub)
.attr('register', function () {
  return sinon.stub().returns({
    build: sinon.stub().returns({
      name: 'myname'
    })
  })
})

Factories.GenericFactory
.traits.noTraits = new Factory()
.extend(Factories.GenericFactory)
.attr('traits', {})

Factories.GenericFactory
.traits.withLast = new Factory()
.extend(Factories.FactoryGranny)
.attr('_last', 'factoryName')
.attr('register', function () {
  return sinon.stub().returns({
    build: sinon.stub().returns({
      name: 'factoryName'
    })
  })
})
