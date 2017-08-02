# hyperHTML-Element

[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC) [![Build Status](https://travis-ci.org/WebReflection/hyperHTML-Element.svg?branch=master)](https://travis-ci.org/WebReflection/hyperHTML-Element) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/hyperHTML-Element/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/hyperHTML-Element?branch=master) [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/WebReflection/donate)

An extensible class to define hyperHTML based Custom Elements.

`npm install hyperhtml-element`

### The Class
```js
const HyperHTMLElement = require('hyperhtml-element');
const hyperHTML = require('hyperhtml');

class MyElement extends HyperHTMLElement {
  constructor() {
    // create a shadow root
    const shadow = this.attachShadow({mode: 'open'});

    // this.html property points to an hyperHTML bound context
    // which could be either the element shadowRoot or the element itself.
    this.html = hyperHTML.bind(shadow);
  }
  // observed attributes are automatically defined as accessors
  static get observedAttributes() { return ['key']; }

  // invoked once the component has been fully upgraded
  // suitable to perform any sort of setup
  // guaranteed to be invoked right before either
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
    // Using explicit event handler here.
    // Events may also be delegated to the context by using handleEvent. See:
    // https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
    return this.html`Hello <strong onclick="${this.onclick}">HyperHTMLElement</strong>`;
  }

  // using the inherited handleEvent,
  // events can be easily defined as methods with `on` prefix.
  onclick(e) {
    // this is the current custom element
    console.log(this, 'click', e.target);
  }

  // all other native Custom Elements method works as usual
  // connectedCallback() { ... }
  // adoptedCallback() { ... }
}

// classes must be defined through their public static method
// this is the moment the class will be fully setup once
// and registered to the customElements Registry.
MyElement.define('my-element');
```

### Compatibility
`HyperHTMLElement` is compatible with every mobile browser and IE11 or greater.

There is a [native live test](https://webreflection.github.io/hyperHTML-Element/test/) page also [transpiled for ES5](https://webreflection.github.io/hyperHTML-Element/test/?es5) browsers.
