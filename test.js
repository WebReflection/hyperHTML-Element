const tressa = require('tressa');
const {Document, Event, HTMLElement} = require('basichtml');

global.document = new Document();
global.customElements = document.customElements;
global.HTMLElement = HTMLElement;

tressa.title('HyperHTMLElement');

const HyperHTMLElement = require('./index.js');
class MyElement extends HyperHTMLElement {

  static get observedAttributes() {
    return ['key'];
  }

  created() {
    this.method = ['created'];
    this.key = 'value';
  }

  attributeChangedCallback() {
    this.method.push('attributeChangedCallback');
  }

  connectedCallback() {
    this.method.push('connectedCallback');
  }

  render() {
    return this.html`Hello <strong>HyperHTMLElement</strong>`;
  }

}

MyElement.define('my-el');

tressa.assert(customElements.get('my-el') === MyElement, '<my-el> defined in the registry');

let el = new MyElement();
document.body.appendChild(el);

tressa.assert(el.method.length === 3, 'all methods invoked');
tressa.assert(el.method.join('created,attributeChangedCallback,connectedCallback'), 'with the right order');
tressa.assert(el.key === 'value' && el.getAttribute('key') === el.key, 'attribute set');

el.key = 'value';
tressa.assert(el.method.join('created,attributeChangedCallback,connectedCallback'), 'setting same attribute value does not trigger');
tressa.assert(el.render() === el.render(), 'html is cached once');
tressa.assert(el.outerHTML === '<my-el key="value">Hello <strong>HyperHTMLElement</strong></my-el>', 'the layout is the expected one');

class MyInput extends HyperHTMLElement {

  static get observedAttributes() {
    return ['value', 'another-value'];
  }

  get value() {
    return this.getAttribute('value');
  }

  set value(value) {
    this.setAttribute('value', value);
  }

  attributeChangedCallback() {
    this.called = true;
  }

}

MyInput.define('my-input');
el = new MyInput();
el.value = '123';
el.value = '123';
el.anotherValue = '456';
el.anotherValue = '456';
tressa.assert(el.value === '123' && el.anotherValue === '456', 'attributes set as expected');
tressa.assert(el.outerHTML === '<my-input value="123" another-value="456"/>', 'input with expected output');

// for code coverage sake
class MyEmptiness extends HyperHTMLElement {}
MyEmptiness.define('my-emptyness');
el = new MyEmptiness();
document.body.appendChild(el);

class MyAttr extends HyperHTMLElement {
  static get observedAttributes() {
    return ['key'];
  }
  created() {
    tressa.assert(true, 'created invoked as expected');
  }
  attributeChangedCallback() {}
}
MyAttr.define('my-attr');
el = new MyAttr();
el.setAttribute('key', 'value');


class MyConnect extends HyperHTMLElement {
  created() { this.counter = 0; }
  connectedCallback() {
    this.counter++;
  }
}
MyConnect.define('my-connect');
el = new MyConnect();
document.body.appendChild(el);
document.body.removeChild(el);
document.body.appendChild(el);
tressa.assert(el.counter === 2, 'connected invoked twice');

class MyCreate extends HyperHTMLElement {
  created() {
    tressa.assert(true, 'create invoked as expected');
  }
}
MyCreate.define('my-create');
el = new MyCreate();
document.body.appendChild(el);

class MyAttrHack extends HyperHTMLElement {
  static get observedAttributes() {
    return ['key'];
  }
  attributeChangedCallback() {
    this.counter = (this.counter || 0) + 1;
  }
}

MyAttrHack.define('my-attr-hack');

let cb = MyAttrHack.prototype.attributeChangedCallback;
Object.defineProperty(
  MyAttrHack.prototype,
  'attributeChangedCallback',
  {
    value: function (name, prev, curr) {
      cb.call(this, name, curr, curr);
    }
  }
);

el = new MyAttrHack();
document.body.appendChild(el);
el.key = 'value';
tressa.assert(!el.counter, 'if same value, is not invoked');
cb.call(el, 'key', 'value', null);
tressa.assert(1 === el.counter, 'otherwise OK');

// code coverage again
class MyAttrHack2 extends HyperHTMLElement {
  static get observedAttributes() {
    return ['key'];
  }
  created() {
    tressa.assert(true, 'initialized correctly via attributes');
  }
}

MyAttrHack2.define('my-attr-hack2');

el = new MyAttrHack2();
document.body.appendChild(el);
el.key = 'value';

// handleEvent
class MyHandler extends HyperHTMLElement {
  handleEvent() { return 123; }
}

MyHandler.define('my-handler');

el = new MyHandler();
tressa.assert(el.handleEvent() === 123, 'original handleEvent preserved');

// handleEvent
class MyRealHandler extends HyperHTMLElement {
  onclick() { tressa.assert(true, 'click event dispatched'); }
  created() { this.html`<span onclick="${this}">click me</span>`; }
}

MyRealHandler.define('my-real-handler');

el = new MyRealHandler();
document.body.appendChild(el);
var evt = new Event('click');
el.firstChild.dispatchEvent(evt);
