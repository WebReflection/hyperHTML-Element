const tressa = require('tressa');
const {parseHTML} = require('linkedom');

const {document, customElements, HTMLElement, CustomEvent} = parseHTML('<html />');

global.document = document;
global.customElements = customElements;
global.HTMLElement = HTMLElement;

tressa.title('HyperHTMLElement');

/*
delete Object.getOwnPropertySymbols;
const getPrototypeOf = Object.getPrototypeOf;
delete Object.getPrototypeOf;
let times = 0;
Object.defineProperty(Object, 'getPrototypeOf', {
  get() {
    return times++ < 2 ? void 0 : getPrototypeOf;
  }
});
delete Object.setPrototypeOf;
delete Reflect.ownKeys;
*/

let HyperHTMLElement = require('./cjs').default;

class MyElement extends HyperHTMLElement {

  static get booleanAttributes() {
    return ['special'];
  }

  get special() { return false; }

  static get observedAttributes() {
    return ['key'];
  }

  constructor(...args) {
    const self = super(...args);
    self.method = [];
    return self;
  }

  get nextSibling() {
    delete MyElement.prototype.nextSibling;
    return false;
  }

  created() {
    this.method.push('created');
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

class MyLink extends HyperHTMLElement {}
MyLink.define('my-link', {extends: 'a'});

tressa.assert(customElements.get('my-el') === MyElement, '<my-el> defined in the registry');
tressa.assert(new MyLink instanceof HyperHTMLElement, '<my-link> is an instance');

let el = new MyElement();
tressa.assert(el.special === false, 'nothing special about this el');
document.body.appendChild(el).key = 'value';
setTimeout(function () { document.body.appendChild(document.createElement('p')); }, 50);

setTimeout(function () {

  document.dispatchEvent(new CustomEvent('DOMContentLoaded'));

  tressa.assert(el.method.length === 3, 'all methods invoked');
  tressa.assert(el.method.join('connectedCallback,attributeChangedCallback,created'), 'with the right order');
  tressa.assert(el.key === 'value' && el.getAttribute('key') === el.key, 'attribute set');

  el.created();
  el.key = 'value';
  tressa.assert(el.method.join('created,attributeChangedCallback,connectedCallback'), 'setting same attribute value does not trigger');
  tressa.assert(el.render() === el.render(), 'html is cached once');
  tressa.assert(el.outerHTML === '<my-el key="value">Hello <strong>HyperHTMLElement</strong></my-el>', 'the layout is the expected one');

  document.readyState = 'complete';
  document.dispatchEvent(new CustomEvent('DOMContentLoaded'));

  delete require.cache[require.resolve('./cjs')];
  HyperHTMLElement = require('./cjs').default;

  class MyInput extends HyperHTMLElement {

    static get booleanAttributes() {
      return ['boolean'];
    }

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
  el.boolean = true;
  tressa.assert(el.value === '123' && el.anotherValue === '456', 'attributes set as expected');
  tressa.assert(el.outerHTML === '<my-input boolean another-value="456" value="123"></my-input>', 'input with expected output');

  el.boolean = 'absolutely';
  tressa.assert(el.boolean === true, 'empty attributes are returned as true');

  el.boolean = false;
  tressa.assert(el.outerHTML === '<my-input another-value="456" value="123"></my-input>', 'input without boolean');

  el.anotherValue = null;
  tressa.assert(el.outerHTML === '<my-input value="123"></my-input>', 'input without other value');

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
    static get booleanAttributes() {
      return ['special-case'];
    }
    handleEvent() { this.value = 123; return this; }
  }

  MyHandler.define('my-handler');

  el = new MyHandler();
  el.specialCase = true;
  tressa.assert(
    el.handleEvent() === el && el.value === 123,
    'original handleEvent preserved and bound'
  );

  // handleEvent
  class MyRealHandler extends HyperHTMLElement {
    onclick() { tressa.assert(true, 'click event dispatched'); }
    created() { this.html`<span onclick="${this}">click me</span>`; }
  }

  MyRealHandler.define('my-real-handler');

  el = new MyRealHandler();
  document.body.insertBefore(el, document.body.lastChild);
  var evt = new CustomEvent('click');
  el.firstChild.dispatchEvent(evt);

  // reaches currentTarget without a dataset
  document.addEventListener('click', el);
  document.dispatchEvent(evt = new CustomEvent('click'));
  document.removeEventListener('click', el);

  // delegated handleEvent
  class MyDelegatedHandler extends HyperHTMLElement {
    whenClickHappens() { tressa.assert(true, 'whenClickHappens event dispatched'); }
    created() { this.html`<span ref="span" data-call="whenClickHappens" onclick="${this}">click me</span>`; }
  }

  MyDelegatedHandler.define('my-delegated-handler');

  el = new MyDelegatedHandler();
  tressa.assert(!el.refs.span, 'no span until created');
  document.body.appendChild(el);
  var evt = new CustomEvent('click');
  el.firstChild.dispatchEvent(evt);

  el.firstChild.onclick = el.whenClickHappens;
  el.firstChild.dispatchEvent(new CustomEvent('click'));

  tressa.assert(el.refs.span === el.querySelector('span'), 'span after creation');

  class MyShadow extends HyperHTMLElement {
    constructor() {
      super();
      this.attachShadow({mode: 'open'});
      this.html`<p ref="gotcha" />`;
    }
  }

  MyShadow.define('my-shadow');

  tressa.assert(!!(new MyShadow).refs.gotcha, 'ref works in shadow dom too');

  // double created
  let createdInstances = 0;
  class MyCreated extends HyperHTMLElement {
    created() { createdInstances++; }
  }
  MyCreated.define('my-created');

  document.body.appendChild(new MyCreated);
  document.body.appendChild(new MyCreated);

  tressa.assert(createdInstances === 2, 'multiple CE do not affect the class');

  // setState with default
  let random = Math.random();
  class StateHandlerDefault extends HyperHTMLElement {
    updateState(state) {
      this.setState(state);
    }
  }

  StateHandlerDefault.define('state-handler-default');

  el = new StateHandlerDefault();
  el.updateState({random: random});
  tressa.assert(
    el.state.random === random,
    'state created from scratch and updated'
  );


  // setState
  class StateHandler extends HyperHTMLElement {
    get defaultState() {
      return {a: 1};
    }
    updateState(state) {
      this.setState(state, false).setState(state);
    }
  }

  StateHandler.define('state-handler');

  el = new StateHandler();
  random = Math.random();
  el.updateState({random: random});
  tressa.assert(
    el.state.random === random && el.state.a === 1,
    'state created from default and updated'
  );

  // setState callback
  class StateHandlerCallback extends HyperHTMLElement {}

  StateHandlerCallback.define('state-handler-callback');

  el = new StateHandlerCallback();
  el.setState({value: 1});
  el.setState(prev => ({value: prev.value + 1}));
  tressa.assert(
    el.state.value === 2,
    'callback executed and result assigned'
  );

  class DefaultState extends HyperHTMLElement {
    get defaultState() { return {a: 'a'}; }
    render() {}
  }
  DefaultState.define('default-state');
  class State extends HyperHTMLElement {}
  State.define('just-state');
  var ds = new DefaultState;
  var o = ds.state;
  tressa.assert(!ds.propertyIsEnumerable('state'), 'states are not enumerable');
  tressa.assert(!ds.propertyIsEnumerable('_state$'), 'neither their secret');
  tressa.assert(o.a === 'a', 'default state retrieved');
  var s = new State;
  s.state = o;
  tressa.assert(s.state === o, 'state can be set too');
  ds.setState({b: 'b'});
  tressa.assert(o.a === 'a' && o.b === 'b', 'state was updated');
  s.state = {z: 123};
  tressa.assert(s.state.z === 123 && !s.state.a, 'state can be re-set too');

  class LateToTheParty extends HyperHTMLElement {
    static get booleanAttributes() { return ['test']; }
    attributeChangedCallback(name, prev, curr) {
      tressa.assert(name === 'test', 'test reacted');
      tressa.assert(prev == null, 'test reacted without a previous value');
      tressa.assert(curr != null && this[name], 'test returns expected value');
    }
  }

  var lttp = document.createElement('late-to-the-party');
  lttp.test = true;
  LateToTheParty.define('late-to-the-party');
  document.body.appendChild(lttp);

  class KebabHouse extends HyperHTMLElement {
    static get observedAttributes() {
      return ['kebab-sold'];
    }

    get kebabSold () {
        return 'Yes, it is';
    }
  }

  KebabHouse.define('kebab-house');
  const kebabHouse = document.createElement('kebab-house');
  tressa.assert(
    kebabHouse.kebabSold === 'Yes, it is',
    `Observed attribute getters don't overwrite predefined getters`
  );

  setTimeout(() => {
    delete require.cache[require.resolve('./cjs')];
    global.Symbol = {};
    require('./cjs');
  }, 100);

}, 100);
