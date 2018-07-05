# hyperHTML-Element

[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC) [![Build Status](https://travis-ci.org/WebReflection/hyperHTML-Element.svg?branch=master)](https://travis-ci.org/WebReflection/hyperHTML-Element) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/hyperHTML-Element/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/hyperHTML-Element?branch=master) [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/WebReflection/donate)

An extensible class to define hyperHTML based Custom Elements.

`npm install hyperhtml-element`

#### hyperHTML included

This class attaches all `hyperHTML` methods to itself,
with the only exception of the `define` method,
used in here to define Custom Elements instead.

To have same [define functionality](https://viperhtml.js.org/hyperhtml/documentation/#api-3),
please use `HyperHTMLElement.intent(...)` which provides exact same API.


### Documentation

You can find more info about this helper in [hyperHTML documentation](https://viperhtml.js.org/hyperhtml/documentation/#components-2) page.



### The Class

```js
const HyperHTMLElement = require('hyperhtml-element');

class MyElement extends HyperHTMLElement {

  // observed attributes are automatically defined as accessors
  static get observedAttributes() { return ['key']; }

  // invoked once the component has been fully upgraded
  // suitable to perform any sort of setup
  // granted to be invoked right before either
  // connectedCallback or attributeChangedCallback
  created() {
    // triggers automatically attributeChangedCallback
    this.key = 'value';
  }

  attributeChangedCallback(name, prev, curr) {
    // when invoked, attributes will be already reflected
    // through their accessor
    this.key === curr; // true, and curr === "value"
    this.getAttribute('key') === this.key; // always true
    this.render();
  }

  render() {
    // lazily defined, this.html property points to an hyperHTML bound context
    // which could be the element shadowRoot or the element itself.
    // All events can be handled directly by the context, thanks to handleEvent
    // https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
    return this.html`
    Hello <strong onclick=${this}>HyperHTMLElement</strong>
    ( ${this.state.clicks} )`;
  }

  // using the inherited handleEvent,
  // events can be easily defined as methods with `on` prefix.
  onclick(e) {
    // `this` refers to the current custom element
    console.log(this, 'click', e.target);
    // state handling, updates the view
    this.setState({clicks: this.state.clicks + 1});
  }

  // alternatively, you can specify a `data-call`
  // attribute with the name of the method to invoke
  // this.html`<i data-call=onAnyEvent onclick=${this}>try</i>`;
  onAnyEvent(e) {
    // `this` still refers to the current custom element
    console.log(this, e.type, e.currentTarget, e.target);
  }

  // you can also use Preact-like events handling
  // this is less efficient, but migration friendly.
  // The method is bound once per instance so that
  // this.handleClick === this.handleClick is always true
  // this.html`<i onclick=${this.handleClick}>try</i>`;
  handleClick(e) {
    // `this` still refers to the current custom element
    console.log(this, e.type, e.currentTarget, e.target);
  }

  // define a default state to use whenever this.state is accessed
  // it can create states from observed properties too
  get defaultState() {
    return {clicks: 0, key: this.key};
  }

  // this method is Preact friendly, once invoked
  // as this.setState({new: 'value'});
  // it will shallow copy properties over
  // and it will invoke this.render() right after
  setState(objOrFn)

  // all other native Custom Elements method works as usual
  // connectedCallback() { ... }
  // adoptedCallback() { ... }
}

// classes must be defined through their public static method
// this is the moment the class will be fully setup once
// and registered to the customElements Registry.
MyElement.define('my-element');
```

#### New in v1.8

You can now define custom elements builtins too:
```js
class MyLink extends HyperHTMLElement {
  created() { this.render(); }
  render() {
    return this.html`hello there!`;
  }
}
MyLink.define('my-link', {extends: 'a'});
```


### Compatibility

`HyperHTMLElement` is compatible with every mobile browser and IE11 or greater.

There is a [native live test](https://webreflection.github.io/hyperHTML-Element/test/) page also [transpiled for ES5](https://webreflection.github.io/hyperHTML-Element/test/?es5) browsers.

