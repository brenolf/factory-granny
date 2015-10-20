<h1 align="center">
	<br>
	<img width="400" src="./logo.png" alt="Factory Granny">
	<br>
	<br>
	<br>
</h1>


[![Build Status](https://travis-ci.org/brenolf/factory-granny.svg)](https://travis-ci.org/brenolf/factory-granny)
[![Coverage Status](https://coveralls.io/repos/brenolf/factory-granny/badge.svg?branch=master&service=github)](https://coveralls.io/github/brenolf/factory-granny?branch=master)
[![npm version](https://badge.fury.io/js/factory-granny.svg)](http://badge.fury.io/js/factory-granny)
> Who were you expecting, Pocahontas?

Factory Granny is a JavaScript library for Factories that are different from the others because it also allows you to build functions instead of objects; This little feature eases test development by allowing you to directly use a Factory instance instead of needing to stub many functions.

## Install
`$ npm install --save-dev factory-granny`

## Usage

### Static methods

```js
var Factory = require('factory-granny')
var sinon = require('sinon')

var UserFactory = new Factory()
.attr('name', 'brenolf')
.static('sayMyName', sinon.stub)

var instance = UserFactory.build()
```

In this example `instance` is a function that always returns an object `{username: 'brenolf'}` when called with `new`. Also, this function will have a `sayMyName` property that is a sinon stub. As simple as that!

Static attributes may also have dependencies over other fields:

```js
var UserFactory = new Factory()
.attr('name', 'brenolf')
.static('sayMyName', ['name'], function (name) {
	return 'Hello ' + name
})
```

Ultimately you can track the changes of the instance being returned on every `build` called, and thus, spy on them.

```js
// factory.js
module.exports = new Factory()
.attr('name', 'brenolf')
.attr('spy', sinon.stub)
.static('sayMyName', ['name'], function (name) {
	return 'Hello ' + name
})

// test.js
var Factory = require('factory.js')

var user = Factory.build()
var instance = user._instance

// ...

expect(instance.spy).to.have.been.calledOnce
```

### Traits

Factory Granny makes it super easy to use traits in your development.

```js
UserFactory.trait('another')
.attr('name', 'heisenberg')

UserFactory.traits.another.build().sayMyName
```

### Factory box

Factory Granny comes with a handful of stubs to make writing you factories even faster. For example:

```js
var UserFactory = new Factory()
.attr('name', 'brenolf')
.static('sayMyName', Factory.box.true())
.static('find', Factory.box.builds(UserFactory, 'another'))
```

There are many other aliases to make writing you factories a fun work:

* `default()`: `sinon.stub()`
* `truthy()`: `sinon.stub().returns(true)`
* `falsy()`: `sinon.stub().returns(false)`
* `returns(value)`: `sinon.stub().returns(value)`
* `throws()`: `sinon.stub().throws()`
* `resolves(value)`: A sinon promise stub which resolves to a given value (`{}` if none given)
* `rejects()`: A sinon promise stub that rejects
* `builds(Factory, trait)`: A sinon promise stub which resolves into an instance of the given factory and trait.

Note that Factory Granny is opinionated using `sinon` for its stubs.

## Basic Usage

Factory Granny uses [Rosie](https://github.com/rosiejs/rosie) as its basis. Any valid formation for Rosie is also valid for Factory Granny.

## License

 Apache License
