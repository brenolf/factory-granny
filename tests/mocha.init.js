'use strict'

var chai = require('chai')

var sinonChai = require('sinon-chai')

var chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

chai.use(sinonChai)

global.sinon = require('sinon')

require('sinon-as-promised')

global.expect = chai.expect

global.Factory = require('rosie').Factory

Factory.prototype.traits = {}

global.Factories = {}
