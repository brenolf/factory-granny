Factories
.GenericFactory = new Factory()
.attr('traits', {
  'trait': {
    'build': sinon.stub()
  }
})
.attr('build', sinon.stub)

Factories.GenericFactory
.traits.noTraits = new Factory()
.extend(Factories.GenericFactory)
.attr('traits', {})
