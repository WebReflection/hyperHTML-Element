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
      return construct(Parent, arguments, Class);
    }, Parent));
  };
}(Object);

/*! (C) 2017 Andrea Giammarchi - ISC Style License */
hyperHTML.Element = _fixBabelExtend(function (_HTMLElement) {
  _inherits(HyperHTMLElement, _HTMLElement);

  function HyperHTMLElement() {
    _classCallCheck(this, HyperHTMLElement);

    return _possibleConstructorReturn(this, (HyperHTMLElement.__proto__ || Object.getPrototypeOf(HyperHTMLElement)).apply(this, arguments));
  }

  _createClass(HyperHTMLElement, [{
    key: 'html',


    // lazily bind once hyperHTML logic
    // to either the shadowRoot, if present and open,
    // or the custom-element itself
    get: function get() {
      return this.html = hyperHTML.bind(this.shadowRoot || this);
    }
  }], [{
    key: 'define',


    // define a custom-element in the CustomElementsRegistry
    value: function define(name) {
      var Class = this;
      var proto = Class.prototype;
      (Class.observedAttributes || []).forEach(function (name) {
        if (name in proto) return;
        Object.defineProperty(proto, name.replace(/-([a-z])/g, function ($0, $1) {
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
      if ('ready' in proto) {
        var init = true;
        var onChanged = proto.attributeChangedCallback;
        var hasChange = !!onChanged;
        Object.defineProperty(proto, 'attributeChangedCallback', {
          configurable: true,
          value: function value() {
            if (init) {
              init = false;
              this.ready();
            }
            if (hasChange && prev !== curr) {
              onChanged.apply(this, arguments);
            }
          }
        });
        var onConnected = proto.connectedCallback;
        var hasConnect = !!onConnected;
        Object.defineProperty(proto, 'connectedCallback', {
          configurable: true,
          value: function value(name, prev, curr) {
            if (init) {
              init = false;
              this.ready();
            }
            if (hasConnect) {
              onConnected.apply(this, arguments);
            }
          }
        });
      }
      return Class;
    }
  }]);

  return HyperHTMLElement;
}(HTMLElement));

