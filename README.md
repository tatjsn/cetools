# cetools

A collection of Custom Elements related utilities for building webapp without build steps.

## Utilities

### signal.js

A wrapper of Preact Signals to provide reactivity across elements via signals.

```html
<!-- initial values are meant to be rendered by server -->
<!-- add autocomplete="off" to prevent conflict when reload -->
<div id="controlId">
  <input type="radio" name="tabs" value="foo" checked id="foo" />
  <label for="foo">Foo</label>
  <input type="radio" name="tabs" value="bar" id="bar" />
  <label for="bar">Bar</label>
</div>

<input id="inputId" type="text" name="status" value="foo" readonly />

<ce-signal init="foo">
  <ce-listener
    for="controlId"
    event="change"
    property="value"
    target
  ></ce-listener>
  <ce-observer for="inputId" property="value"></ce-observer>
  <ce-observer for="divId" property="textContent"></ce-observer>
  <ce-observer for="formId" action="requestSubmit" void></ce-observer>
</ce-signal>
```

### partial.js

Data fetching and page patial replacement.

```html
<ce-partial for="target">
  <form id="theForm">
    <input id="inputBox" type="text" name="query" autocomplete="off" />
  </form>
</ce-partial>
<ul id="target">
  <!-- Content will be replaced with server response -->
</ul>
<ce-signal init="">
  <ce-listener
    for="theForm"
    event="keyup"
    property="value"
    target
    debounce
  ></ce-listener>
  <ce-observer for="theForm" action="requestSubmit" void></ce-observer>
</ce-signal>
```

### h.js

Shorthand for Document.createElement.

```js
document.body.appendChild(h.h1({ style: "color:hotpink" }, "Hello"));
```

### ReactiveElement

A base class for custom elements with reactivity in attribute manipulations, heavily inspired by Lit.

```js
import ReactiveElement from "./reactive-element.js";
import h from "./h.js";

export class YourCustomElement extends ReactiveElement {
  static properties = {
    month: "2023-11",
  };

  constructor() {
    super();
  }

  render() {
    // No event handlers here since we'll use <ce-signal>
    return h.p(`You selected: ${this.month}`);
  }
}

customElements.define("your-custom", YourCustomElement);
```

### SwitchElement

A utility custom element that enables the selective display of elements matching a specified query, suitable for use cases such as creating tabs-like user interfaces.

```html
<ce-switch id="switchId" query="foo">
  <ul slot="foo">
    <li>Foo content</li>
    <li>Foo content</li>
  </ul>
  <ul slot="bar">
    <li>Bar content</li>
    <li>Bar content</li>
  </ul>
</ce-switch>
```

## How to install

```html
<script type="module" src="https://unpkg.com/cetools@1.0.0/signal.js"></script>
```

## How to publish

```sh
npm version patch
npm publish --access=public
```
