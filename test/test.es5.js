"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _templateObject, _templateObject2, _templateObject3, _templateObject4;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var MySelf = /*#__PURE__*/function (_HyperHTMLElement) {
  _inherits(MySelf, _HyperHTMLElement);

  var _super = _createSuper(MySelf);

  function MySelf() {
    _classCallCheck(this, MySelf);

    return _super.apply(this, arguments);
  }

  _createClass(MySelf, [{
    key: "created",
    value: function created() {
      this.render();
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback() {
      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      return this.html(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    Hi, my name is ", ",\n    I am ", " ", ""])), this.name, this.age, this.active ? ' and still active' : '');
    }
  }], [{
    key: "booleanAttributes",
    get: function get() {
      return ['active'];
    }
  }, {
    key: "observedAttributes",
    get: function get() {
      return ['name', 'age'];
    }
  }]);

  return MySelf;
}(HyperHTMLElement);

MySelf.define('my-self');

var MyInput = /*#__PURE__*/function (_HyperHTMLElement2) {
  _inherits(MyInput, _HyperHTMLElement2);

  var _super2 = _createSuper(MyInput);

  function MyInput() {
    _classCallCheck(this, MyInput);

    return _super2.apply(this, arguments);
  }

  _createClass(MyInput, [{
    key: "attributeChangedCallback",
    value: function attributeChangedCallback() {
      this.render();
    }
  }, {
    key: "oninput",
    value: function oninput(e) {
      this.value = e.target.value;
      this.render();
      console.assert(this.refs.input === this.querySelector('input'), 'input as ref');
    }
  }, {
    key: "render",
    value: function render() {
      return this.html(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    <input ref=\"input\" value=\"", "\" oninput=\"", "\">"])), this.value, this);
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['value', 'boolean'];
    }
  }]);

  return MyInput;
}(HyperHTMLElement);

MyInput.define('my-input');

var MyLink = /*#__PURE__*/function (_HyperHTMLElement3) {
  _inherits(MyLink, _HyperHTMLElement3);

  var _super3 = _createSuper(MyLink);

  function MyLink() {
    _classCallCheck(this, MyLink);

    return _super3.apply(this, arguments);
  }

  _createClass(MyLink, [{
    key: "created",
    value: function created() {
      this.href = 'https://github.com/WebReflection/hyperHTML-Element/';
      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      return this.html(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["it worked"])));
    }
  }]);

  return MyLink;
}(HyperHTMLElement);

MyLink.define('my-link', {
  "extends": 'a'
});
setTimeout(function () {
  HyperHTMLElement.bind(document.body.appendChild(document.createElement('div')))(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["<my-self name=\"Rando\" age=\"17\" active=", "></my-self>"])), Math.random() < .5);
}, 1000);

