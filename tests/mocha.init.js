'use strict'

var chai = require('chai')

var sinonChai = require('sinon-chai')

chai.use(sinonChai)

global.sinon = require('sinon')

require('sinon-as-promised')

global.expect = chai.expect