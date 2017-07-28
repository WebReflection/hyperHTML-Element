/*! (C) 2017 Andrea Giammarchi - ISC Style License */
hyperHTML.Element = class HyperHTMLElement extends HTMLElement {

  // define a custom-element in the CustomElementsRegistry
  static define(name) {
    const Class = this;
    const proto = Class.prototype;
    (Class.observedAttributes || []).forEach(name => {
      if (name in proto) return;
      Object.defineProperty(
        proto,
        name.replace(/-([a-z])/g, ($0, $1) => $1.toUpperCase()),
        {
          configurable: true,
          get() { return this.getAttribute(name); },
          set(value) { this.setAttribute(name, value); }
        }
      );
    });
    if ('ready' in proto) {
      let init = true;
      const onChanged = proto.attributeChangedCallback;
      const hasChange = !!onChanged;
      Object.defineProperty(
        proto,
        'attributeChangedCallback',
        {
          configurable: true,
          value() {
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
      Object.defineProperty(
        proto,
        'connectedCallback',
        {
          configurable: true,
          value(name, prev, curr) {
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
    return Class;
  }
  
  // lazily bind once hyperHTML logic
  // to either the shadowRoot, if present and open,
  // or the custom-element itself
  get html() {
    return (this.html = hyperHTML.bind(this.shadowRoot || this));
  }

};