'use strict'

var chai = require('chai')
var sinon = require('sinon')
var rewire = require('rewire')
var sinonChai = require('sinon-chai')
var chaiAsPromised = require('chai-as-promised')

require('sinon-as-promised')
chai.use(chaiAsPromised)
chai.use(sinonChai)

global.rewire = rewire
global.sinon = sinon
global.expect = chai.expect
global.Factory = require('rosie').Factory
Factory.prototype.traits = {}

global.Factories = {}
