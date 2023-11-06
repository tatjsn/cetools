# cetools

A collection of Custom Elements related utilities for building webapp without build steps.

## Utilities

### signal.js

A wrapper of Solid.js to provide reactivity across elements via signals.

```html
<!-- initial "checked" is meant to be rendered by server -->
<input type="radio" name="tabs" value="foo" checked id="foo" />
<label for="foo">Foo</label>
<input type="radio" name="tabs" value="bar" id="bar" />
<label for="bar">Bar</label>

<!-- initial "value" is meant to be rendered by server -->
<input type="text" name="status" value="foo" readonly />
<input type="text" name="status2" value="foo" readonly />

<!-- "init" is meant to be rendered by server -->
<ce-signal init="foo">
  <ce-listener event="change" name="tabs"></ce-listener>
  <ce-observer selector="input[name=status]" property="value"></ce-observer>
  <ce-observer selector="input[name=status2]" property="value"></ce-observer>
  <ce-observer selector="div#blah" property="textContent"></ce-observer>
  <ce-observer selector="form#hoge" action="requestSubmit" void></ce-observer>
</ce-signal>
```

### rpc.js

Data fetching and page fragment replacement.

```html
<ce-rpc for="target">
  <form id="hoge">
    <input type="hidden" name="key1" value="value1" />
    <input type="hidden" name="key2" value="value2" />
    <!-- should this be explicit? -->
    <!-- as it can be injected by ce-rpc -->
    <!-- but must be configurable -->
    <input type="hidden" name="fragment" value="target" />
  </form>
</ce-rpc>

<button type="submit" form="hoge">
  <div id="target">results</div>
</button>
```

### h.js

Shorthand for Document.createElement.

```js
document.body.appendChild(h.h1({ style: "color:hotpink" }, "Hello"));
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
