# Usage with Typescript
You can import the library and use it with Typescript:

```ts
import HyperHTMLElement from "hyperhtml-element";

class MySimpleElement extends HyperHTMLElement {
   render() {
      this.html`Hello from my-simple-element!`
   }
}

MySimpleElement.define('my-simple-element');
```

You can also define the type of the state using an interface, for have a better auto-complete in your editor. You should also define the observedAttributes that are automaticaly mapped as class attributes. Here's a more complex example:

```ts
import HyperHTMLElement from "hyperhtml-element";

interface MyCustomElementState {
   counter: number;
   name: string;
}

class MyCustomElement extends HyperHTMLElement<MyCustomElementState> {

   // Observed attributes are mapped to class attributes, converted from kebab-case to camelCase
   // They should be declared for later use and declared as optional since the user is not forced to use them
   name?: string;

   static get observedAttributes() {
      return ['name'];
   }

   attributeChangedCallback(attrName: string, prev: string, curr: string) {
      if (attrName === 'name') {
         this.setState({name: curr});
      }
   }

   get defaultState() {
      return {
         counter: 0,
         name: this.name || ''
      };
   }

   created() {
      this.render();
   }

   oninput(e: KeyboardEvent) {
      const value = (e.target as HTMLInputElement).value;
      this.setState({name: value});
   }

   handleIncrement(e: Event) {
      this.setState({counter: ++this.state.counter});
   }

   handleDecrement(e: Event) {
      this.setState({counter: --this.state.counter});
   }

   render() {
      this.html`
      <strong>Owner:</strong> ${this.state.name}<br />
      <strong>Counter:</strong> ${this.state.counter}<br />
      <button onclick=${this.handleIncrement}>+</button> <button onclick=${this.handleDecrement}>-</button>
      ${this.state.counter < 0 ?
         HyperHTMLElement.wire()`<div style=${{color: 'red'}}>Warning: negative counter!</div>`
         : ''}
      <br /><br />
      Change Owner name: <input value=${this.state.name} oninput=${this} />
      `;
   }

}

MyCustomElement.define('my-custom-element');
```
