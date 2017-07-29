'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n    Hi, my name is ', ' and I am ', ''], ['\n    Hi, my name is ', ' and I am ', '']),
    _templateObject2 = _taggedTemplateLiteral(['\n    <input value="', '" oninput="', '">'], ['\n    <input value="', '" oninput="', '">']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MySelf = function (_HyperHTMLElement) {
  _inherits(MySelf, _HyperHTMLElement);

  function MySelf() {
    _classCallCheck(this, MySelf);

    return _possibleConstructorReturn(this, (MySelf.__proto__ || Object.getPrototypeOf(MySelf)).apply(this, arguments));
  }

  _createClass(MySelf, [{
    key: 'created',
    value: function created() {
      this.render();
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback() {
      this.render();
    }
  }, {
    key: 'render',
    value: function render() {
      return this.html(_templateObject, this.name, this.age);
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['name', 'age'];
    }
  }]);

  return MySelf;
}(HyperHTMLElement);

MySelf.define('my-self');

var MyInput = function (_HyperHTMLElement2) {
  _inherits(MyInput, _HyperHTMLElement2);

  function MyInput() {
    _classCallCheck(this, MyInput);

    return _possibleConstructorReturn(this, (MyInput.__proto__ || Object.getPrototypeOf(MyInput)).apply(this, arguments));
  }

  _createClass(MyInput, [{
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback() {
      this.render();
    }
  }, {
    key: 'handleEvent',
    value: function handleEvent(e) {
      this.value = e.target.value;
      this.render();
    }
  }, {
    key: 'render',
    value: function render() {
      return this.html(_templateObject2, this.value, this);
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['value'];
    }
  }]);

  return MyInput;
}(HyperHTMLElement);

MyInput.define('my-input');

