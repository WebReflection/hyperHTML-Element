const HyperHTMLElement = (defineProperty => {
  /*! (C) 2017 Andrea Giammarchi - ISC Style License */
  return class HyperHTMLElement extends HTMLElement {

    // define a custom-element in the CustomElementsRegistry
    // class MyEl extends HyperHTMLElement {}
    // MyEl.define('my-el');
    static define(name) {
      const Class = this;
      const proto = Class.prototype;

      // if observedAttributes contains attributes to observe
      // HyperHTMLElement will directly reflect get/setAttribute
      // operation once these attributes are used, example:
      // el.observed = 123;
      // will automatically do
      // el.setAttribute('observed', 123);
      // triggering also the attributeChangedCallback
      (Class.observedAttributes || []).forEach(name => {
        if (!(name in proto)) defineProperty(
          proto,
          name.replace(/-([a-z])/g, ($0, $1) => $1.toUpperCase()),
          {
            configurable: true,
            get() { return this.getAttribute(name); },
            set(value) { this.setAttribute(name, value); }
          }
        );
      });

      const onChanged = proto.attributeChangedCallback;
      const hasChange = !!onChanged;

      // created() {} is the entry point to do whatever you want.
      // Once the node is live and upgraded as Custom Element.
      // This method grants to be triggered at the right time,
      // which is always once, and right before either
      // attributeChangedCallback or connectedCallback
      if ('created' in proto) {
        const created = proto.created;
        // used to ensure create() is called once and once only
        defineProperty(
          proto,
          '__init',
          {
            writable: true,
            value: true
          }
        );

        // ⚠️ if you need to overwrite/change attributeChangedCallback method
        //    at runtime after class definition, be sure you do so
        //    via Object.defineProperty to preserve its non-enumerable nature.
        defineProperty(
          proto,
          'attributeChangedCallback',
          {
            configurable: true,
            value(name, prev, curr) {
              if (this.__init) {
                this.__init = false;
                created.call(this);
              }
              // ensure setting same value twice
              // won't trigger twice attributeChangedCallback
              if (hasChange && prev !== curr) {
                onChanged.apply(this, arguments);
              }
            }
          }
        );

        // ⚠️ if you need to overwrite/change connectedCallback method
        //    at runtime after class definition, be sure you do so
        //    via Object.defineProperty to preserve its non-enumerable nature.
        const onConnected = proto.connectedCallback;
        const hasConnect = !!onConnected;
        defineProperty(
          proto,
          'connectedCallback',
          {
            configurable: true,
            value() {
              if (this.__init) {
                this.__init = false;
                this.created();
              }
              if (hasConnect) {
                onConnected.apply(this, arguments);
              }
            }
          }
        );
      } else if (hasChange) {
        // ⚠️ if you need to overwrite/change attributeChangedCallback method
        //    at runtime after class definition, be sure you do so
        //    via Object.defineProperty to preserve its non-enumerable nature.
        defineProperty(
          proto,
          'attributeChangedCallback',
          {
            configurable: true,
            value(name, prev, curr) {
              // ensure setting same value twice
              // won't trigger twice attributeChangedCallback
              if (prev !== curr) {
                onChanged.apply(this, arguments);
              }
            }
          }
        );
      }

      // whenever you want to directly use the component itself
      // as EventListener, you can pass it directly.
      // https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
      //  class Reactive extends HyperHTMLElement {
      //    oninput(e) { console.log(this, 'changed', e.target.value); }
      //    render() { this.html`<input oninput="${this}">`; }
      //  }
      if (!('handleEvent' in proto)) {
        // ⚠️ if you need to overwrite/change handleEvent method
        //    at runtime after class definition, be sure you do so
        //    via Object.defineProperty to preserve its non-enumerable nature.
        defineProperty(
          proto,
          'handleEvent',
          {
            configurable: true,
            value(event) {
              this['on' + event.type](event);
            }
          }
        );
      }
      customElements.define(name, Class);
      return Class;
    }

    // lazily bind once hyperHTML logic
    // to either the shadowRoot, if present and open,
    // the _shadowRoot property, if set due closed shadow root,
    // or the custom-element itself if no Shadow DOM is used.
    get html() {
      // ⚠️ defineProperty(this, 'html', {...}) would be the intent
      //    then you have to deal with IE11 and broken ES5 implementations
      //    where a getter in the prototype curses forever instances
      //    properties definition.
      return this.__hyperHTML || defineProperty(this, '__hyperHTML', {
        configurable: true,
        value: hyperHTML.bind(
          // in case of Shadow DOM {mode: "open"}, use it
          this.shadowRoot ||
          // in case of Shadow DOM {mode: "close"}, use it
          // this needs the following reference created upfront
          // this._shadowRoot = this.attachShadow({mode: "close"});
          this._shadowRoot ||
          // if no Shadow DOM is used, simply use the component
          // as container for its own content (it just works too)
          this
        )
      }).__hyperHTML;
    }

  };

})(Object.defineProperty);

try {
  // try to export HyperHTMLElement as module
  module.exports = HyperHTMLElement;
  // if possible, also eventually require hyperHTML
  // and hoist it on the current scope
  var hyperHTML = hyperHTML || require('hyperhtml');
} catch(o_O) {}