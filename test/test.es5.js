class MySelf extends HyperHTMLElement {
  static get booleanAttributes() {
    return ['active'];
  }

  static get observedAttributes() {
    return ['name', 'age'];
  }

  created() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    return this.html`
    Hi, my name is ${this.name},
    I am ${this.age} ${this.active ? ' and still active' : ''}`;
  }

}

MySelf.define('my-self');

class MyInput extends HyperHTMLElement {
  static get observedAttributes() {
    return ['value', 'boolean'];
  }

  attributeChangedCallback() {
    this.render();
  }

  oninput(e) {
    this.value = e.target.value;
    this.render();
    console.assert(this.refs.input === this.querySelector('input'), 'input as ref');
  }

  render() {
    return this.html`
    <input ref="input" value="${this.value}" oninput="${this}">`;
  }

}

MyInput.define('my-input');

class MyLink extends HyperHTMLElement {
  created() {
    this.href = 'https://github.com/WebReflection/hyperHTML-Element/';
    this.render();
  }

  render() {
    return this.html`it worked`;
  }

}

MyLink.define('my-link', {
  extends: 'a'
});
setTimeout(function () {
  HyperHTMLElement.bind(document.body.appendChild(document.createElement('div')))`<my-self name="Rando" age="17" active=${Math.random() < .5}></my-self>`;
}, 1000);

