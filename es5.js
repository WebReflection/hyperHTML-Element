'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _fixBabelExtend = function (O) {
  var gOPD = O.getOwnPropertyDescriptor,
      gPO = O.getPrototypeOf || function (o) {
    return o.__proto__;
  },
      sPO = O.setPrototypeOf || function (o, p) {
    o.__proto__ = p;
    return o;
  },
      construct = (typeof Reflect === 'undefined' ? 'undefined' : _typeof(Reflect)) === 'object' ? Reflect.construct : function (Parent, args, Class) {
    var Constructor,
        a = [null];
    a.push.apply(a, args);
    Constructor = Parent.bind.apply(Parent, a);
    return sPO(new Constructor(), Class.prototype);
  };

  return function fixBabelExtend(Class) {
    var Parent = gPO(Class);
    return sPO(Class, sPO(function Super() {
      return construct(Parent, arguments, gPO(this).constructor);
    }, Parent));
  };
}(Object);

var HyperHTMLElement = function (defineProperty) {
  /*! (C) 2017 Andrea Giammarchi - ISC Style License */
  return _fixBabelExtend(function (_HTMLElement) {
    _inherits(HyperHTMLElement, _HTMLElement);

    function HyperHTMLElement() {
      _classCallCheck(this, HyperHTMLElement);

      return _possibleConstructorReturn(this, (HyperHTMLElement.__proto__ || Object.getPrototypeOf(HyperHTMLElement)).apply(this, arguments));
    }

    _createClass(HyperHTMLElement, [{
      key: 'html',


      // lazily bind once hyperHTML logic
      // to either the shadowRoot, if present and open,
      // the _shadowRoot property, if set due closed shadow root,
      // or the custom-element itself if no Shadow DOM is used.
      get: function get() {
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
          this)
        }).__hyperHTML;
      }
    }], [{
      key: 'define',


      // define a custom-element in the CustomElementsRegistry
      // class MyEl extends HyperHTMLElement {}
      // MyEl.define('my-el');
      value: function define(name) {
        var Class = this;
        var proto = Class.prototype;

        // if observedAttributes contains attributes to observe
        // HyperHTMLElement will directly reflect get/setAttribute
        // operation once these attributes are used, example:
        // el.observed = 123;
        // will automatically do
        // el.setAttribute('observed', 123);
        // triggering also the attributeChangedCallback
        (Class.observedAttributes || []).forEach(function (name) {
          if (!(name in proto)) defineProperty(proto, name.replace(/-([a-z])/g, function ($0, $1) {
            return $1.toUpperCase();
          }), {
            configurable: true,
            get: function get() {
              return this.getAttribute(name);
            },
            set: function set(value) {
              this.setAttribute(name, value);
            }
          });
        });

        var onChanged = proto.attributeChangedCallback;
        var hasChange = !!onChanged;

        // created() {} is the entry point to do whatever you want.
        // Once the node is live and upgraded as Custom Element.
        // This method grants to be triggered at the right time,
        // which is always once, and right before either
        // attributeChangedCallback or connectedCallback
        if ('created' in proto) {
          // used to ensure create() is called once and once only
          defineProperty(proto, '__init', {
            writable: true,
            value: true
          });

          // ⚠️ if you need to overwrite/change attributeChangedCallback method
          //    at runtime after class definition, be sure you do so
          //    via Object.defineProperty to preserve its non-enumerable nature.
          defineProperty(proto, 'attributeChangedCallback', {
            configurable: true,
            value: function value(name, prev, curr) {
              if (this.__init) {
                this.__init = false;
                this.created();
              }
              // ensure setting same value twice
              // won't trigger twice attributeChangedCallback
              if (hasChange && prev !== curr) {
                onChanged.apply(this, arguments);
              }
            }
          });

          // ⚠️ if you need to overwrite/change connectedCallback method
          //    at runtime after class definition, be sure you do so
          //    via Object.defineProperty to preserve its non-enumerable nature.
          var onConnected = proto.connectedCallback;
          var hasConnect = !!onConnected;
          defineProperty(proto, 'connectedCallback', {
            configurable: true,
            value: function value() {
              if (this.__init) {
                this.__init = false;
                this.created();
              }
              if (hasConnect) {
                onConnected.apply(this, arguments);
              }
            }
          });
        } else if (hasChange) {
          // ⚠️ if you need to overwrite/change attributeChangedCallback method
          //    at runtime after class definition, be sure you do so
          //    via Object.defineProperty to preserve its non-enumerable nature.
          defineProperty(proto, 'attributeChangedCallback', {
            configurable: true,
            value: function value(name, prev, curr) {
              // ensure setting same value twice
              // won't trigger twice attributeChangedCallback
              if (prev !== curr) {
                onChanged.apply(this, arguments);
              }
            }
          });
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
          defineProperty(proto, 'handleEvent', {
            configurable: true,
            value: function value(event) {
              this['on' + event.type](event);
            }
          });
        }
        customElements.define(name, Class);
        return Class;
      }
    }]);

    return HyperHTMLElement;
  }(HTMLElement));
}(Object.defineProperty);

try {
  // try to export HyperHTMLElement as module
  module.exports = HyperHTMLElement;
  // if possible, also eventually require hyperHTML
  // and hoist it on the current scope
  var hyperHTML = hyperHTML || require('hyperhtml');
} catch (o_O) {}

