const HyperHTMLElement = (defineProperty => {
  /*! (C) 2017 Andrea Giammarchi - ISC Style License */
  return class HyperHTMLElement extends HTMLElement {

    // define a custom-element in the CustomElementsRegistry
    static define(name) {
      const Class = this;
      const proto = Class.prototype;

      // watch directly attributes and reflect get/setAttribute
      (Class.observedAttributes || []).forEach(name => {
        if (name in proto) return;
        defineProperty(
          proto,
          name.replace(/-([a-z])/g, ($0, $1) => $1.toUpperCase()),
          {
            configurable: true,
            get() { return this.getAttribute(name); },
            set(value) { this.setAttribute(name, value); }
          }
        );
      });

      // ensure ready is triggered at the right time
      // which is always before either attributeChangedCallback
      // or connectedCallback
      if ('ready' in proto) {
        let init = true;
        const onChanged = proto.attributeChangedCallback;
        const hasChange = !!onChanged;
        defineProperty(
          proto,
          'attributeChangedCallback',
          {
            configurable: true,
            value(name, prev, curr) {
              if (init) {
                init = false;
                this.ready();
              }
              if (hasChange && prev !== curr) {
                onChanged.apply(this, arguments);
              }
            }
          }
        );
        const onConnected = proto.connectedCallback;
        const hasConnect = !!onConnected;
        defineProperty(
          proto,
          'connectedCallback',
          {
            configurable: true,
            value() {
              if (init) {
                init = false;
                this.ready();
              }
              if (hasConnect) {
                onConnected.apply(this, arguments);
              }
            }
          }
        );
      }
      customElements.define(name, Class);
      return Class;
    }
    
    // lazily bind once hyperHTML logic
    // to either the shadowRoot, if present and open,
    // or the custom-element itself
    get html() {
      return defineProperty(this, 'html', {
        configurable: true,
        value: hyperHTML.bind(this.shadowRoot || this)
      }).html;
    }

  };

})(Object.defineProperty);

try { module.exports = HyperHTMLElement; } catch(o_O) {}