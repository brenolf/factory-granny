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

Factory('User')
.attr('name', 'brenolf')
.static('sayMyName', sinon.stub)

var instance = Factory('User').get()
```

In this example `instance` is a function that always returns an object `{username: 'brenolf'}` when called with `new`. Also, this function will have a `sayMyName` property that is a stub. As simple as that!

Static attributes may also have dependencies over other fields:

```js
Factory('User')
.attr('name', 'brenolf')
.static('sayMyName', ['name'], function (name) {
	return 'Hello ' + name
})
```

Ultimately you can track the changes of the instance being returned on every `get` called, and thus, spy on them.

```js
// user-factory.js
module.exports = Factory('User')
.attr('name', 'brenolf')
.attr('spy', sinon.stub)
.static('sayMyName', ['name'], function (name) {
	return 'Hello ' + name
})

// test.js
var UserFactory = require('user-factory.js')

var user = UserFactory.get()
var instance = user._instance

// ...

expect(instance.spy).to.have.been.calledOnce
```

You can also call `build` instead of `get` in order to get an object with all the attributes given, but not needing to instantiate the returned function.

```js
var UserFactory = require('user-factory.js')

/*
	user_fn = function () {
		return {
			name: 'brenolf',
			spy: sinon.stub()
		}
	}
*/
var user_fn = UserFactory.get()

/*
	user = {
		name: 'brenolf',
		spy: sinon.stub()
	}
*/
var user = UserFactory.build()
```

### Traits

Factory Granny makes it super easy to use traits in your development.

```js
Factory('User.ABQ')
.attr('name', 'heisenberg')

Factory('User.ABQ').get().sayMyName
```

As a matter of fact, you don't need to first write the parent factory. You can define a trait first and later its parent just by calling `propagate`.

```js
Factory('Name.trait')
.attr('name', 'This is my name')

Factory('Name')
.attr('name', 'Main name')
.attr('parent', true)
.propagate()

Factory('Name').build() // { name: 'Main name', parent: true }

Factory('Name.trait').build() // { name: 'This is my name', parent: true }
```

If you don't call `propagate` at the end of the parents' chain, then all of its traits will not inherit its attributes.

### Factory box

Factory Granny comes with a handful of stubs to make writing you factories even faster. For example:

```js
Factory('User')
.attr('name', 'brenolf')
.static('sayMyName', Factory.box.true())
.static('find', Factory.box.chain('User.ABQ'))
```

There are many other aliases to make writing you factories a fun work:

| Method                   | Equivalent                                                                           |
|--------------------------|--------------------------------------------------------------------------------------|
| `simple()`              | `sinon.stub()`                                                                       |
| `true()`                 | `sinon.stub().returns(true)`                                                         |
| `false()`                | `sinon.stub().returns(false)`                                                        |
| `returns(value)`         | `sinon.stub().returns(value)`                                                        |
| `throws()`               | `sinon.stub().throws()`                                                              |
| `resolves(value)`        | A sinon promise stub which resolves to a given value (`{}` if none given) |
| `rejects()`              | A sinon promise stub that rejects |
| `chain(Factory)` | A sinon stub that returns a `.build()` of the given factory |
| `chainAsync(Factory)` | A sinon stub that resolves a `.build()` of the given factory |

The greatest advantage of using `Factory.box` is when working with the factories. Since every function is evaluated on each `build` and `get` calls, if you wanted to have an attribute evaluated to a function value (using `sinon` stubs, for instance) you would need to write down a function that returns a function pointer. Factory Granny does that for you under the hood!

Note that Factory Granny is opinionated using `sinon` for its stubs.

## Basic Usage

Factory Granny uses [Rosie](https://github.com/rosiejs/rosie) as its basis. Any valid formation for Rosie is also valid for Factory Granny.

## License

 Apache License
