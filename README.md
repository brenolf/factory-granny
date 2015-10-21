<h1 align="center">
	<br>
	<img width="400" src="./logo.png" alt="Factory Granny">
	<br>
	<br>
	<br>
</h1>


[![Build Status](https://travis-ci.org/brenolf/factory-granny.svg)](https://travis-ci.org/brenolf/factory-granny)
[![Coverage Status](https://coveralls.io/repos/brenolf/factory-granny/badge.svg?branch=master&service=github)](https://coveralls.io/github/brenolf/factory-granny?branch=master)
[![Code Climate](https://codeclimate.com/github/brenolf/factory-granny/badges/gpa.svg)](https://codeclimate.com/github/brenolf/factory-granny)
[![npm version](https://badge.fury.io/js/factory-granny.svg)](http://badge.fury.io/js/factory-granny)
> Who were you expecting, Pocahontas?

Factory Granny is a JavaScript library for Factories that is different from the others because it also allows you to build functions instead of objects; This little feature eases test development by allowing you to directly use a Factory instance instead of needing to stub many functions.

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

var instance = UserFactory.get()
```

In this example `instance` is a function that always returns an object `{username: 'brenolf'}` when called with `new`. Also, this function will have a `sayMyName` property that is a stub. As simple as that!

Static attributes may also have dependencies over other fields:

```js
var UserFactory = new Factory()
.attr('name', 'brenolf')
.static('sayMyName', ['name'], function (name) {
	return 'Hello ' + name
})
```

Ultimately you can track the changes of the instance being returned on every `get` called, and thus, spy on them.

```js
// user-factory.js
module.exports = new Factory()
.attr('name', 'brenolf')
.attr('spy', sinon.stub)
.static('sayMyName', ['name'], function (name) {
	return 'Hello ' + name
})

// test.js
var Factory = require('user-factory.js')

var user = Factory.get()
var instance = user._instance

// ...

expect(instance.spy).to.have.been.calledOnce
```

You can also call `build` instead of `get` in order to get an object with all the attributes given, but not needing to instantiate the returned function.

```js
/*
	user_fn = function () {
		return {
			name: 'brenolf',
			spy: sinon.stub()
		}
	}
*/
var user_fn = Factory.get()

/*
	user = {
		name: 'brenolf',
		spy: sinon.stub()
	}
*/
var user = Factory.build()
```

### Traits

Factory Granny makes it super easy to use traits in your development.

```js
UserFactory.trait('ABQ')
.attr('name', 'heisenberg')

UserFactory.traits.ABQ.get().sayMyName
```

### Factory box

Factory Granny comes with a handful of stubs to make writing you factories even faster. For example:

```js
var UserFactory = new Factory()
.attr('name', 'brenolf')
.static('sayMyName', Factory.box.true())
.static('find', Factory.box.builds(UserFactory, 'ABQ'))
```

There are many other aliases to make writing you factories a fun work:

| Method                   | Equivalent                                                                           |
|--------------------------|--------------------------------------------------------------------------------------|
| `simple()`              | `sinon.stub()`                                                                       |
| `true()`                 | `sinon.stub().returns(true)`                                                         |
| `false()`                | `sinon.stub().returns(false)`                                                        |
| `returns(value)`         | `sinon.stub().returns(value)`                                                        |
| `throws()`               | `sinon.stub().throws()`                                                              |
| `resolves(value)`        | A sinon promise stub which resolves to a given value (`{}` if none given)            |
| `rejects()`              | A sinon promise stub that rejects                                                    |
| `builds(Factory, trait)` | A sinon promise stub which resolves into an instance of the given factory and trait. |

The greatest advantage of using `Factory.box` is when working with the factories. Since every function is evaluated on each `build` and `get` calls, if you wanted to have an attribute evaluated to a function value (using `sinon` stubs, for instance) you would need to write down a function that returns a function pointer. Factory Granny does that for you under the hood!

Note that Factory Granny is opinionated using `sinon` for its stubs.

## Basic Usage

Factory Granny uses [Rosie](https://github.com/rosiejs/rosie) as its basis. Any valid formation for Rosie is also valid for Factory Granny.

## License

 Apache License
